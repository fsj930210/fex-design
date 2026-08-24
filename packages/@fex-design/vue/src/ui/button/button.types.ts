import type { ButtonOptions } from '@fex-design/core/button/types'
import type { ButtonHTMLAttributes } from 'vue'

export interface ButtonProps extends ButtonOptions {
  type?: ButtonHTMLAttributes['type']
}
