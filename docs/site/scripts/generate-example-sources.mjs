import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { frameworkExtensions, readExampleSource } from './example-source.mjs'

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentRoot = resolve(siteRoot, '../../packages/@fex-design/components')
const outputRoot = resolve(siteRoot, 'public/example-source')
const filter = process.argv.find((value) => value.startsWith('--component='))?.slice(12)
const components = filter ? new Set(filter.split(',')) : undefined

if (!components) {
  if (relative(siteRoot, outputRoot).split(sep).join('/') !== 'public/example-source')
    throw new Error('Example source output must stay inside the docs public directory')
  await rm(outputRoot, { recursive: true, force: true })
}

let count = 0
for (const [framework, extension] of Object.entries(frameworkExtensions)) {
  for (const layer of ['primitive', 'ui']) {
    const layerRoot = resolve(componentRoot, framework, 'src', layer)
    for (const component of await readdir(layerRoot, { withFileTypes: true })) {
      if (
        !component.isDirectory() ||
        component.name.toLowerCase().includes('trash') ||
        (components && !components.has(component.name))
      )
        continue
      const examplesRoot = resolve(layerRoot, component.name, 'examples')
      let examples
      try {
        examples = await readdir(examplesRoot, { withFileTypes: true })
      } catch (error) {
        if (error.code === 'ENOENT') continue
        throw error
      }
      for (const example of examples) {
        if (!example.isFile() || !example.name.endsWith(`.${extension}`)) continue
        const name = example.name.slice(0, -extension.length - 1)
        const result = await readExampleSource({
          componentRoot,
          framework,
          layer,
          component: component.name,
          example: name,
        })
        const output = resolve(outputRoot, framework, layer, component.name, `${name}.json`)
        await mkdir(dirname(output), { recursive: true })
        await writeFile(output, JSON.stringify(result))
        count++
      }
    }
  }
}
console.log(`Generated ${count} example sources`)
