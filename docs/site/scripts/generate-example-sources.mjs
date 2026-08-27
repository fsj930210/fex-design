import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { codeToHtml } from 'shiki'

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const componentRoot = resolve(siteRoot, '../../packages/@fex-design')
const outputRoot = resolve(siteRoot, 'public/example-source')
const frameworks = {
  angular: { extension: 'ts', language: 'typescript' },
  react: { extension: 'tsx', language: 'tsx' },
  solid: { extension: 'tsx', language: 'tsx' },
  svelte: { extension: 'svelte', language: 'svelte' },
  vue: { extension: 'vue', language: 'vue' },
}

await rm(outputRoot, { recursive: true, force: true })

for (const [framework, config] of Object.entries(frameworks)) {
  for (const layer of ['primitive', 'ui']) {
    const layerRoot = resolve(componentRoot, framework, 'src', layer)
    for (const component of await readdir(layerRoot, { withFileTypes: true })) {
      if (!component.isDirectory()) continue
      const examplesRoot = resolve(layerRoot, component.name, 'examples')
      let examples
      try {
        examples = await readdir(examplesRoot, { withFileTypes: true })
      } catch {
        continue
      }
      for (const example of examples) {
        if (!example.isFile() || !example.name.endsWith(`.${config.extension}`)) continue
        const name = example.name.slice(0, -config.extension.length - 1)
        let source = await readFile(resolve(examplesRoot, example.name), 'utf8')
        if (framework === 'angular') {
          try {
            source += `\n\n<!-- ${name}.html -->\n${await readFile(resolve(examplesRoot, `${name}.html`), 'utf8')}`
          } catch {}
        }
        const html = await codeToHtml(source, { lang: config.language, theme: 'github-light' })
        const output = resolve(outputRoot, framework, layer, component.name, `${name}.json`)
        await mkdir(dirname(output), { recursive: true })
        await writeFile(output, JSON.stringify({ source, html }))
      }
    }
  }
}
