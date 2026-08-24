import type { ButtonGroupOptions, ButtonIconOptions } from '@fex-design/core/button/types'
import type { ButtonHTMLAttributes } from 'vue'

export interface ButtonProps {
  type?: ButtonHTMLAttributes['type']
}

export interface ButtonGroupProps extends ButtonGroupOptions {}

export interface ButtonIconProps extends ButtonIconOptions {}
