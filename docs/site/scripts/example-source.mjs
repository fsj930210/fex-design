import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { codeToHtml } from 'shiki'

export const frameworkExtensions = {
  angular: 'ts',
  react: 'tsx',
  solid: 'tsx',
  svelte: 'svelte',
  vue: 'vue',
}

export async function readExampleSource({ componentRoot, framework, layer, component, example }) {
  const extension = frameworkExtensions[framework]
  let file = resolve(componentRoot, framework, 'src', layer, component, 'examples', `${example}.${extension}`)
  let source = await readFile(file, 'utf8')
  const visited = new Set([file])

  // Expand forwarding modules to the code they run, without changing its imports.
  while (true) {
    const forwarded = source.match(/^\s*export\s*\{\s*\w+(?:\s+as\s+\w+)?\s*\}\s*from\s*['"]([^'"]+)['"];?\s*$/)
    if (!forwarded) break
    const specifier = forwarded[1]
    const publicPath = specifier.match(/^@fex-design\/([^/]+)\/(primitive|ui)\/([^/]+)\/examples\/([^/]+)$/)
    if (publicPath && publicPath[1] === framework) {
      file = resolve(componentRoot, framework, 'src', publicPath[2], publicPath[3], 'examples', `${publicPath[4]}.${extension}`)
    } else if (specifier.startsWith('.')) {
      file = resolve(dirname(file), specifier.endsWith(`.${extension}`) ? specifier : `${specifier}.${extension}`)
    } else break
    if (visited.has(file)) throw new Error(`Circular example re-export: ${file}`)
    visited.add(file)
    source = await readFile(file, 'utf8')
  }

  async function appendTemplate(file) {
    if (framework !== 'angular') return ''
    const template = file.replace(/\.ts$/, '.html')
    try {
      return `\n\n<!-- ${template.slice(dirname(template).length + 1)} -->\n${await readFile(template, 'utf8')}`
    } catch (error) {
      if (error.code === 'ENOENT') return ''
      throw error
    }
  }

  const parts = []
  async function collectParts(contents, parent) {
    for (const [, imported] of contents.matchAll(/from\s*['"](\.\/_parts\/[^'"]+)['"]/g)) {
      const filename = imported.endsWith(`.${extension}`) ? imported : `${imported}.${extension}`
      const partFile = resolve(dirname(parent), filename)
      if (visited.has(partFile)) continue
      visited.add(partFile)
      const part = await readFile(partFile, 'utf8')
      const label = framework === 'vue' || framework === 'svelte' ? `<!-- ${filename} -->` : `// ${filename}`
      parts.push(`\n\n${label}\n${part}${await appendTemplate(partFile)}`)
      await collectParts(part, partFile)
    }
  }

  await collectParts(source, file)
  source += await appendTemplate(file)
  source += parts.join('')
  const language = framework === 'angular' ? 'typescript' : extension === 'tsx' ? 'tsx' : framework
  const html = await codeToHtml(source, {
    lang: language,
    themes: { light: 'github-light', dark: 'github-dark' },
  })
  return { source, html }
}
