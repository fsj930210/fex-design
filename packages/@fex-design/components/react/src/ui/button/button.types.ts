import type { ButtonIcon } from '../../primitive/button'
import type { LoadingIcon } from '../../icons/loading'
import type { ButtonOptions } from '@fex-design/core/button/types'
import type { ComponentProps, ReactNode } from 'react'

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'color' | 'disabled'>, ButtonOptions {
  startIconProps?:
    | Omit<ComponentProps<typeof ButtonIcon>, 'children' | 'placement' | 'data-icon'>
    | undefined
  endIconProps?:
    | Omit<ComponentProps<typeof ButtonIcon>, 'children' | 'placement' | 'data-icon'>
    | undefined
  loadingIconProps?:
    | Omit<ComponentProps<typeof LoadingIcon>, 'children' | 'aria-hidden'>
    | undefined
  icon?: ReactNode
  loadingIndicator?: ReactNode
}
