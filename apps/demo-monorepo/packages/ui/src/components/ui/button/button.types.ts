import type { ButtonOptions } from '@demo/ui/components/primitive/button/utils'
import type { ComponentProps, ReactNode } from 'react'

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'color' | 'disabled'>, ButtonOptions {
  icon?: ReactNode
  loadingIndicator?: ReactNode
}
