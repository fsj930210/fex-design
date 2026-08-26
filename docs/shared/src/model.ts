export const frameworks = ['react', 'vue', 'solid', 'svelte', 'angular'] as const

export type Framework = (typeof frameworks)[number]
export type ApiValue = string | number | boolean | string[] | Record<string, unknown>

export interface ApiProperty {
  name: string
  type: string
  default?: ApiValue
  description: string
  editor?: 'boolean' | 'string' | 'number' | 'enum' | 'tags' | 'json'
  options?: ApiValue[]
}

export interface ApiEvent {
  name: string
  parameters: Array<{ name: string; type: string }>
  description: string
}

export interface ComponentApi {
  name: string
  slug: string
  layer: 'primitive' | 'ui' | 'pro'
  status: 'draft' | 'stable' | 'deprecated'
  description: string
  importPath: Record<Framework, string>
  props: ApiProperty[]
  events: ApiEvent[]
  demos: Array<{ id: string; title: string; description: string }>
  cssVariables?: Array<{ name: string; description: string }>
}
