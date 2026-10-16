export const frameworkExtensions: {
  angular: 'ts'
  react: 'tsx'
  solid: 'tsx'
  svelte: 'svelte'
  vue: 'vue'
}

export function readExampleSource(options: {
  componentRoot: string
  framework: keyof typeof frameworkExtensions
  layer: 'primitive' | 'ui'
  component: string
  example: string
}): Promise<{ source: string; html: string }>
