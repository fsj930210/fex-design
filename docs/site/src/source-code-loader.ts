import type { Framework } from './types'

const sourceFiles = import.meta.glob<string>(
  '../../../packages/@fex-design/components/*/src/*/*/*.{tsx,ts,vue,svelte,html}',
  { query: '?raw', import: 'default' },
)

const extensionMap: Record<Framework, string[]> = {
  react: ['tsx', 'ts'],
  solid: ['tsx', 'ts'],
  vue: ['vue', 'ts'],
  svelte: ['svelte', 'ts'],
  angular: ['ts', 'html'],
}

function findComponentEntry(framework: Framework, layer: 'primitive' | 'ui', slug: string) {
  const directory = `../../../packages/@fex-design/components/${framework}/src/${layer}/${slug}`
  // Component families expose index entries; their implementation can be split or renamed.
  const candidates = [
    'index.ts',
    'index.tsx',
    ...extensionMap[framework].map((ext) => `${slug}-root.${ext}`),
    ...extensionMap[framework].map((ext) => `${slug}.${ext}`),
  ]
  for (const filename of candidates) {
    const path = `${directory}/${filename}`
    const load = sourceFiles[path]
    if (load) return { filename, load }
  }
  return undefined
}

export function getComponentFilePath(
  framework: Framework,
  layer: 'primitive' | 'ui',
  slug: string,
): string {
  const entry = findComponentEntry(framework, layer, slug)
  return `src/components/${layer}/${slug}/${entry?.filename ?? 'index.ts'}`
}

export async function loadComponentSource(
  framework: Framework,
  layer: 'primitive' | 'ui',
  slug: string,
): Promise<{ filename: string; code: string }> {
  const entry = findComponentEntry(framework, layer, slug)
  if (entry) {
    const code = await entry.load()
    return {
      filename: entry.filename,
      code: typeof code === 'string' ? code : '',
    }
  }

  // 兜底返回模板示例
  return {
    filename: 'index.ts',
    code: `// ${slug} ${layer} implementation for ${framework}\n// 源码位于 packages/@fex-design/components/${framework}/src/${layer}/${slug}`,
  }
}
