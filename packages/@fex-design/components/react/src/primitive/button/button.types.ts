import type { ButtonGroupOptions } from '@fex-design/core/button/types'
import type { ButtonAppearanceOptions } from '@fex-design/core/button/types'
import type { ComponentProps } from 'react'

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'color'>, ButtonAppearanceOptions {
  'data-slot'?: string | undefined
}

export interface ButtonGroupProps extends ComponentProps<'div'>, ButtonGroupOptions {}

export interface ButtonIconProps extends ComponentProps<'span'> {
  placement?: 'start' | 'end'
  'data-icon'?: string | undefined
}
