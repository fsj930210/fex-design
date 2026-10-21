import type { ComponentProps } from 'solid-js'
import type { Button } from '../button'
import type {
  InputClassNames,
  InputSearchMeta,
  InputStyles,
  InputVisualOptions,
} from '@fex-design/core/input/types'
import type { JSX } from 'solid-js'

export interface InputProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'>, InputVisualOptions {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  prefix?: JSX.Element
  suffix?: JSX.Element
  addonBefore?: JSX.Element
  addonAfter?: JSX.Element
  clearable?: boolean
  clear?: JSX.Element
  classNames?: InputClassNames
  styles?: InputStyles<JSX.CSSProperties>
  'data-warning'?: string | undefined
}
export interface InputPasswordProps extends Omit<InputProps, 'type'> {
  visibilityToggle?: boolean
}
export interface InputSearchProps extends Omit<InputProps, 'type'> {
  addonBeforeButtonProps?:
    | Omit<ComponentProps<typeof Button>, 'children' | 'loading' | 'disabled' | 'onClick'>
    | undefined
  addonAfterButtonProps?:
    | Omit<ComponentProps<typeof Button>, 'children' | 'loading' | 'disabled' | 'onClick'>
    | undefined
  loading?: boolean
  onSearch?: (value: string, meta: InputSearchMeta) => void
}
