export type ProgressStyle = string | Record<string, string | number | null | undefined>
export type ProgressClassNames = Partial<Record<'root' | 'track' | 'range' | 'info' | 'label' | 'step', string>>
export type ProgressStyles = Partial<Record<keyof ProgressClassNames, ProgressStyle>>

export function mergeProgressStyle(defaults: Record<string, string | undefined>, style?: ProgressStyle): ProgressStyle {
  if (typeof style !== 'string') return { ...defaults, ...style }
  const declarations = Object.entries(defaults)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${value};`).join(' ')
  return `${declarations} ${style}`
}
