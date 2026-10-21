import type { ButtonIcon } from '../../primitive/button'
import type { LoadingIcon } from '../../icons/loading'
import type { ComponentProps, JSX, ParentProps } from 'solid-js'
import type { ButtonOptions } from '@fex-design/core/button/types'

export type ButtonProps = ParentProps<
  Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'disabled'> &
    ButtonOptions & {
      startIconProps?:
        | Omit<ComponentProps<typeof ButtonIcon>, 'children' | 'placement' | 'data-icon'>
        | undefined
      endIconProps?:
        | Omit<ComponentProps<typeof ButtonIcon>, 'children' | 'placement' | 'data-icon'>
        | undefined
      loadingIconProps?:
        | Omit<ComponentProps<typeof LoadingIcon>, 'children' | 'aria-hidden'>
        | undefined
      icon?: JSX.Element | undefined
      loadingIndicator?: JSX.Element | undefined
    }
>
