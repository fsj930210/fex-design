import type { ButtonAppearanceOptions, ButtonGroupOptions } from '@fex-design/core/button/types'
import type { JSX, ParentProps } from 'solid-js'

export type ButtonProps = ParentProps<
  Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & ButtonAppearanceOptions
>

export type ButtonGroupProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement> & ButtonGroupOptions>

export type ButtonIconProps = ParentProps<
  JSX.HTMLAttributes<HTMLSpanElement> & {
    placement?: 'start' | 'end'
    'data-icon'?: string | undefined
  }
>
