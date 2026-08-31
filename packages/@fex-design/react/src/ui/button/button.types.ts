import type { ButtonOptions } from '@fex-design/core/button/types'
import type { ComponentProps, ReactNode } from 'react'

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'color' | 'disabled'>, ButtonOptions {
  icon?: ReactNode
  loadingIndicator?: ReactNode
}
