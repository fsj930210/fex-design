import type { ButtonOptions } from '@fex-design/core/button/types'
import type { JSX, ParentProps } from 'solid-js'

export type ButtonProps = ParentProps<
  Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'disabled'> &
    ButtonOptions & {
      icon?: JSX.Element | undefined
      loadingIndicator?: JSX.Element | undefined
    }
>
