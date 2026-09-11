import type {
  InputClassNames,
  InputSearchMeta,
  InputStyles,
  InputVisualOptions,
} from '@fex-design/core/input/types'
import type { ComponentProps, CSSProperties, ReactNode, Ref } from 'react'

export interface InputProps
  extends
    Omit<ComponentProps<'input'>, 'size' | 'prefix' | 'defaultValue' | 'value'>,
    InputVisualOptions {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  prefix?: ReactNode
  suffix?: ReactNode
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  clearable?: boolean
  clearIcon?: ReactNode
  classNames?: InputClassNames
  styles?: InputStyles<CSSProperties>
  ref?: Ref<HTMLInputElement>
}

export interface InputPasswordProps extends Omit<InputProps, 'type'> {
  visibilityToggle?: boolean
}

export interface InputSearchProps extends Omit<InputProps, 'type'> {
  loading?: boolean
  onSearch?: (value: string, meta: InputSearchMeta) => void
}
