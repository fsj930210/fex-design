import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repositoryRoot = resolve(siteRoot, '../..')
const docsRoot = resolve(repositoryRoot, 'docs')
const contentRoot = resolve(docsRoot, 'content/components')
const apiRoot = resolve(docsRoot, 'api')
const manifestRoot = resolve(docsRoot, 'shared/src')
const output = resolve(siteRoot, 'src/generated/component-registry.ts')
const layers = ['primitive', 'ui']
const frameworks = ['react', 'vue', 'solid', 'svelte', 'angular']

function fail(message) {
  throw new Error(`Component registry: ${message}`)
}

function unwrapExpression(expression) {
  let current = expression
  while (ts.isAsExpression(current) || ts.isParenthesizedExpression(current) || ts.isSatisfiesExpression(current)) {
    current = current.expression
  }
  return current
}

async function names(root, extension) {
  const entries = await readdir(root, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => entry.name.slice(0, -extension.length))
    .sort()
}

async function validateFrameworkContracts(slug, layer) {
  const file = resolve(apiRoot, layer, `${slug}.json`)
  const api = JSON.parse(await readFile(file, 'utf8'))
  for (const framework of frameworks) {
    const native = api.frameworks?.[framework] ?? {}
    const properties = (native.props ?? api.props).filter((property) => !native.omitProps?.includes(property.name))
    for (const property of properties) {
      if (property.type.includes('FrameworkNode') && !native.typeOverrides?.FrameworkNode) {
        fail(`${file} leaves FrameworkNode unresolved for ${framework}.${property.name}`)
      }
    }
  }
}

function parseManifest(sourceText, file) {
  const source = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true)
  const declarations = []
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    if (!statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.name.text.endsWith('Examples')) continue
      if (!declaration.initializer || !ts.isObjectLiteralExpression(unwrapExpression(declaration.initializer))) continue
      declarations.push(declaration)
    }
  }
  if (declarations.length !== 1) fail(`${file} must export exactly one *Examples object`)
  const declaration = declarations[0]
  const scenes = new Map()
  const manifestObject = unwrapExpression(declaration.initializer)
  for (const property of manifestObject.properties) {
    if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) continue
    if (!layers.includes(property.name.text) || !ts.isArrayLiteralExpression(property.initializer)) continue
    const ids = []
    for (const item of property.initializer.elements) {
      if (!ts.isObjectLiteralExpression(item)) fail(`${file} has an invalid ${property.name.text} scene`)
      const id = item.properties.find(
        (candidate) =>
          ts.isPropertyAssignment(candidate) && ts.isIdentifier(candidate.name) && candidate.name.text === 'id',
      )
      if (!id || !ts.isPropertyAssignment(id) || !ts.isStringLiteral(id.initializer)) {
        fail(`${file} has a scene without a string id`)
      }
      ids.push(id.initializer.text)
    }
    scenes.set(property.name.text, ids)
  }
  for (const layer of layers) if (!scenes.has(layer)) fail(`${file} is missing its ${layer} scenes`)
  return { exportName: declaration.name.text, scenes }
}

function importPath(from, target) {
  const path = relative(dirname(from), target).split(sep).join('/').replace(/\.ts$/, '')
  return path.startsWith('.') ? path : `./${path}`
}

const documentSlugs = await names(contentRoot, '.mdx')
const apiSlugs = new Map(await Promise.all(layers.map(async (layer) => [layer, await names(resolve(apiRoot, layer), '.json')])))
const manifestSlugs = (await names(manifestRoot, '-manifest.ts')).sort()

for (const layer of layers) {
  const expected = documentSlugs.join(',')
  const actual = apiSlugs.get(layer).join(',')
  if (expected !== actual) fail(`${layer} API slugs (${actual}) do not match documents (${expected})`)
}
if (documentSlugs.join(',') !== manifestSlugs.join(',')) {
  fail(`manifest slugs (${manifestSlugs.join(',')}) do not match documents (${documentSlugs.join(',')})`)
}

const registry = []
for (const slug of documentSlugs) {
  await Promise.all(layers.map((layer) => validateFrameworkContracts(slug, layer)))
  const manifestFile = resolve(manifestRoot, `${slug}-manifest.ts`)
  const manifest = parseManifest(await readFile(manifestFile, 'utf8'), manifestFile)
  registry.push({ slug, manifestFile, ...manifest })
}

const lines = [
  '// Generated by scripts/generate-component-registry.mjs. Do not edit.',
  "import type { ComponentApi } from '../types'",
]
for (const item of registry) {
  for (const layer of layers) {
    lines.push(`import ${layer}${item.slug[0].toUpperCase()}${item.slug.slice(1)}Api from '${importPath(output, resolve(apiRoot, layer, `${item.slug}.json`))}'`)
  }
  lines.push(`import * as ${item.slug}Manifest from '${importPath(output, item.manifestFile)}'`)
}
lines.push('', 'export const componentApis = {')
for (const item of registry) {
  const name = `${item.slug[0].toUpperCase()}${item.slug.slice(1)}`
  lines.push(`  ${item.slug}: { primitive: primitive${name}Api as ComponentApi, ui: ui${name}Api as ComponentApi },`)
}
lines.push("} as const satisfies Record<string, Record<'primitive' | 'ui', ComponentApi>>", '', 'export const componentExamples = {')
for (const item of registry) lines.push(`  ${item.slug}: ${item.slug}Manifest.${item.exportName},`)
lines.push('} as const', '', 'export type DocumentedComponent = keyof typeof componentApis', '', 'export function isDocumentedComponent(slug: string): slug is DocumentedComponent {', '  return slug in componentApis', '}', '')

await mkdir(dirname(output), { recursive: true })
await writeFile(output, lines.join('\n'))
