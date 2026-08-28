import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import fs from 'node:fs/promises'
import path from 'node:path'
import { codeToHtml } from 'shiki'

const extensions = {
  react: 'tsx',
  vue: 'vue',
  solid: 'tsx',
  svelte: 'svelte',
  angular: 'ts',
} as const

const siteBase = process.env.DOCS_BASE_PATH ?? '/'

export default defineConfig({
  base: siteBase.endsWith('/') ? siteBase : `${siteBase}/`,
  // MDX files live in ../content, outside this package's node_modules lookup path.
  // Dedupe resolves them from this Vite root without bypassing Solid's browser conditions.
  resolve: {
    dedupe: ['solid-js', 'solid-mdx'],
  },
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
        ],
        rehypePlugins: [rehypeSlug],
      }),
      enforce: 'pre',
    },
    solid({ extensions: ['.tsx', '.ts', '.md', '.mdx'] }),
    tailwindcss(),
    {
      name: 'fex-example-source',
      configureServer(server) {
        server.middlewares.use('/__example-source', async (request, response) => {
          const url = new URL(request.url ?? '', 'http://docs.local')
          const framework = url.searchParams.get('framework') as keyof typeof extensions
          const layer = url.searchParams.get('layer')
          const component = url.searchParams.get('component')
          const example = url.searchParams.get('example')
          if (
            !extensions[framework] ||
            !['primitive', 'ui'].includes(layer ?? '') ||
            !['button', 'card', 'separator', 'spinner'].includes(component ?? '') ||
            !/^[a-z-]+$/.test(example ?? '')
          ) {
            response.statusCode = 400
            response.end('Invalid example')
            return
          }
          const base = path.resolve(
            process.cwd(),
            '../../packages/@fex-design',
            framework,
            'src',
            layer!,
            component,
            'examples',
          )
          const file = path.join(base, `${example}.${extensions[framework]}`)
          try {
            let source = await fs.readFile(file, 'utf8')
            let angularTemplateBase = base
            if (layer === 'ui') {
              const reexport = source.match(/export \{ \w+ \} from ['"]\.\.\/\.\.\/\.\.\/primitive\/([^/]+)\/examples\/([^'"]+)['"]/)
              if (reexport) {
                const primitiveBase = path.resolve(process.cwd(), '../../packages/@fex-design', framework, 'src', 'primitive', reexport[1], 'examples')
                angularTemplateBase = primitiveBase
                source = await fs.readFile(path.join(primitiveBase, `${reexport[2]}.${extensions[framework]}`), 'utf8')
                source = source.replaceAll(`@fex-design/${framework}/primitive/${reexport[1]}`, `@fex-design/${framework}/ui/${component}`)
                if (framework === 'angular') source = source.replace("from '../separator'", "from '@fex-design/angular/ui/separator'")
                if (framework === 'svelte') source = source.replace(/from ['"][^'"]*separator\.svelte['"]/, "from '@fex-design/svelte/ui/separator'")
              }
            }
            if (framework === 'angular') {
              try {
                  source += `\n\n<!-- ${example}.html -->\n${await fs.readFile(path.join(angularTemplateBase, `${example}.html`), 'utf8')}`
              } catch {}
            }
            const language =
              framework === 'react' || framework === 'solid'
                ? 'tsx'
                : framework === 'angular'
                  ? 'typescript'
                  : framework
            const html = await codeToHtml(source, { lang: language, theme: 'github-light' })
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify({ source, html }))
          } catch {
            response.statusCode = 404
            response.end('Example source not found')
          }
        })
      },
    },
  ],
})
