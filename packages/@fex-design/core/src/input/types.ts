export type InputSize = 'sm' | 'md' | 'lg'

export type InputVariant = 'outlined' | 'filled' | 'borderless' | 'underlined'

export type InputPart =
  | 'root'
  | 'control'
  | 'prefix'
  | 'suffix'
  | 'addonBefore'
  | 'addonAfter'
  | 'clear'
  | 'action'

export type InputClassNames = Partial<Record<InputPart, string>>
export type InputStyles<TStyle> = Partial<Record<InputPart, TStyle>>

export interface InputVisualOptions {
  size?: InputSize
  variant?: InputVariant
}

export type InputSearchSource =
  | 'enter'
  | 'prefix'
  | 'suffix'
  | 'addonBefore'
  | 'addonAfter'

export interface InputSearchMeta {
  source: InputSearchSource
}
