import type { ButtonGroupOptions, ButtonIconOptions } from '@fex-design/core/button/types'
import type { ComponentProps } from 'react'

export interface ButtonProps extends ComponentProps<'button'> {
  'data-slot'?: string | undefined
}

export interface ButtonGroupProps extends ComponentProps<'div'>, ButtonGroupOptions {}

export interface ButtonIconProps extends ComponentProps<'span'>, ButtonIconOptions {}
