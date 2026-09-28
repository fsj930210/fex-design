import type { ButtonOptions } from '@/components/primitive/button/utils'
import type { ComponentProps, ReactNode } from 'react'

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'color' | 'disabled'>, ButtonOptions {
  icon?: ReactNode
  loadingIndicator?: ReactNode
}
