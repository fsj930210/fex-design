import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import { codeToHtml } from 'shiki'

const extensions = { react: 'tsx', vue: 'vue', solid: 'tsx', svelte: 'svelte', angular: 'ts' } as const

export default defineConfig({ plugins: [solid(), tailwindcss(), {
  name: 'fex-example-source',
  configureServer(server) {
    server.middlewares.use('/__example-source', async (request, response) => {
      const url = new URL(request.url ?? '', 'http://docs.local')
      const framework = url.searchParams.get('framework') as keyof typeof extensions
      const layer = url.searchParams.get('layer')
      const component = url.searchParams.get('component')
      const example = url.searchParams.get('example')
      if (!extensions[framework] || !['primitive', 'ui'].includes(layer ?? '') || component !== 'button' || !/^[a-z-]+$/.test(example ?? '')) { response.statusCode = 400; response.end('Invalid example'); return }
      const base = path.resolve(process.cwd(), '../../packages/@fex-design', framework, 'src', layer!, component, 'examples')
      const file = path.join(base, `${example}.${extensions[framework]}`)
      try {
        let source = await fs.readFile(file, 'utf8')
        if (framework === 'angular') { try { source += `\n\n<!-- ${example}.html -->\n` + await fs.readFile(path.join(base, `${example}.html`), 'utf8') } catch {} }
        const language = framework === 'react' || framework === 'solid' ? 'tsx' : framework === 'angular' ? 'typescript' : framework
        const html = await codeToHtml(source, { lang: language, theme: 'github-light' })
        response.setHeader('Content-Type', 'application/json; charset=utf-8'); response.end(JSON.stringify({ source, html }))
      } catch { response.statusCode = 404; response.end('Example source not found') }
    })
  },
}] })
