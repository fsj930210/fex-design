import type { Button } from '../button'
import type {
  InputClassNames,
  InputSearchMeta,
  InputStyles,
  InputVisualOptions,
} from '@fex-design/core/input/types'
import type { ChangeEvent, ComponentProps, CSSProperties, ReactNode, Ref } from 'react'

export interface InputProps
  extends
    Omit<ComponentProps<'input'>, 'size' | 'prefix' | 'defaultValue' | 'value'>,
    InputVisualOptions {
  value?: string
  defaultValue?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  prefix?: ReactNode
  suffix?: ReactNode
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  clearable?: boolean
  clear?: ReactNode
  classNames?: InputClassNames
  styles?: InputStyles<CSSProperties>
  ref?: Ref<HTMLInputElement>
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
