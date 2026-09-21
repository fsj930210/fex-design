import type { ButtonAppearanceOptions, ButtonGroupOptions } from '@fex-design/core/button/types'
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface ButtonProps extends Omit<HTMLButtonAttributes, 'color'>, ButtonAppearanceOptions {
  ref?: HTMLButtonElement | null
}

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & ButtonGroupOptions

export interface ButtonIconProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: HTMLSpanElement | null
  placement?: 'start' | 'end'
}
