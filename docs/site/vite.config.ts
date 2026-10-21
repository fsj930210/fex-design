import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import path from 'node:path'
import { frameworkExtensions as extensions, readExampleSource } from './scripts/example-source.mjs'

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
      name: 'example-source',
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
            !/^[a-z][a-z-]*$/.test(component ?? '') ||
            !/^[a-z-]+$/.test(example ?? '')
          ) {
            response.statusCode = 400
            response.end('Invalid example')
            return
          }
          try {
            const result = await readExampleSource({
              componentRoot: path.resolve(process.cwd(), '../../packages/@fex-design/components'),
              framework,
              layer: layer as 'primitive' | 'ui',
              component: component!,
              example: example!,
            })
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify(result))
          } catch {
            response.statusCode = 404
            response.end('Example source not found')
          }
        })
      },
    },
  ],
})
