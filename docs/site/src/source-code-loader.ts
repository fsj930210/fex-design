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

export function getComponentFilePath(framework: Framework, layer: 'primitive' | 'ui', slug: string): string {
  const exts = extensionMap[framework] || ['tsx']
  return `src/components/${layer}/${slug}.${exts[0]}`
}

export async function loadComponentSource(
  framework: Framework,
  layer: 'primitive' | 'ui',
  slug: string,
): Promise<{ filename: string; code: string }> {
  const exts = extensionMap[framework] || ['tsx']
  for (const ext of exts) {
    const relativePath = `../../../packages/@fex-design/components/${framework}/src/${layer}/${slug}/${slug}.${ext}`
    if (relativePath in sourceFiles) {
      const code = await sourceFiles[relativePath]()
      return {
        filename: `${slug}.${ext}`,
        code: typeof code === 'string' ? code : '',
      }
    }
  }

  // 兜底返回模板示例
  return {
    filename: `${slug}.${exts[0]}`,
    code: `// ${slug} ${layer} implementation for ${framework}\n// 源码位于 packages/@fex-design/components/${framework}/src/${layer}/${slug}`,
  }
}
