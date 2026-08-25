import type { ButtonAppearanceOptions, ButtonGroupOptions } from '@fex-design/core/button/types'
import type { ButtonHTMLAttributes } from 'vue'

export interface ButtonProps extends ButtonAppearanceOptions {
  type?: ButtonHTMLAttributes['type']
}

export interface ButtonGroupProps extends ButtonGroupOptions {}
