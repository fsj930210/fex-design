import type { ComponentProps } from 'svelte'
import type { Button } from '@fex-design/svelte/ui/button'
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
  clear?: Snippet
  clearable?: boolean
  classNames?: InputClassNames
  styles?: InputStyles<string>
  ref?: HTMLInputElement | null
  'data-warning'?: string | undefined
}
export interface InputPasswordProps extends Omit<InputProps, 'type'> {
  visibilityToggle?: boolean
}
export interface InputSearchProps extends Omit<InputProps, 'type' | 'addonAfter'> {
  loading?: boolean
  onSearch?: (value: string, meta: InputSearchMeta) => void
  addonBeforeButtonProps?:
    | Omit<ComponentProps<typeof Button>, 'children' | 'loading' | 'disabled' | 'onclick'>
    | undefined
  addonAfterButtonProps?:
    | Omit<ComponentProps<typeof Button>, 'children' | 'loading' | 'disabled' | 'onclick'>
    | undefined
  addonAfter?: Snippet | null
}
