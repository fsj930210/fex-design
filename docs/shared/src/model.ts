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

export interface ApiSlot {
  name: string
  description: string
}

export interface FrameworkApi {
  /** Complete framework-native contract. When present, it replaces the shared rows. */
  props?: ApiProperty[]
  /** Framework-native differences applied to the shared property rows. */
  omitProps?: string[]
  typeOverrides?: Record<string, string>
  events?: ApiEvent[]
  slots?: ApiSlot[]
  slotLabel?: string
}

export interface ComponentApi {
  name: string
  slug: string
  layer: 'primitive' | 'ui' | 'pro'
  status: 'draft' | 'stable' | 'deprecated'
  description: string
  nativeElement?: string
  importPath: Record<Framework, string>
  props: ApiProperty[]
  events: ApiEvent[]
  slots?: ApiSlot[]
  frameworks?: Partial<Record<Framework, FrameworkApi>>
  demos: Array<{ id: string; title: string; description: string }>
  components?: ComponentApi[]
  cssVariables?: Array<{ name: string; description: string }>
}
