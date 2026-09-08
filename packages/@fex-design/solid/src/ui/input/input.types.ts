import type { InputClassNames, InputSearchMeta, InputStyles, InputVisualOptions } from '@fex-design/core/input/types'
import type { JSX } from 'solid-js'

export interface InputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'>, InputVisualOptions {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  prefix?: JSX.Element
  suffix?: JSX.Element
  addonBefore?: JSX.Element
  addonAfter?: JSX.Element
  clearable?: boolean
  clearIcon?: JSX.Element
  classNames?: InputClassNames
  styles?: InputStyles<JSX.CSSProperties>
}
export interface InputPasswordProps extends Omit<InputProps, 'type'> { visibilityToggle?: boolean }
export interface InputSearchProps extends Omit<InputProps, 'type'> { loading?: boolean; onSearch?: (value: string, meta: InputSearchMeta) => void }
