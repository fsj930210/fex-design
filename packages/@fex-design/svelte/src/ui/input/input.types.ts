import type {
  InputClassNames,
  InputSearchMeta,
  InputStyles,
  InputVisualOptions,
} from '@fex-design/core/input/types'
import type { Snippet } from 'svelte'
import type { HTMLInputAttributes } from 'svelte/elements'
export interface InputProps
  extends Omit<HTMLInputAttributes, 'class' | 'size' | 'value'>, InputVisualOptions {
  class?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  prefix?: Snippet
  suffix?: Snippet
  addonBefore?: Snippet
  addonAfter?: Snippet
  clearIcon?: Snippet
  clearable?: boolean
  classNames?: InputClassNames
  styles?: InputStyles<string>
  ref?: HTMLInputElement | null
}
export interface InputPasswordProps extends Omit<InputProps, 'type'> {
  visibilityToggle?: boolean
}
export interface InputSearchProps extends Omit<InputProps, 'type' | 'addonAfter'> {
  loading?: boolean
  onSearch?: (value: string, meta: InputSearchMeta) => void
  addonAfter?: Snippet | null
}
