import type { ButtonGroupOptions, ButtonIconOptions } from '@fex-design/core/button/types'
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'

export interface ButtonProps extends HTMLButtonAttributes {
  ref?: HTMLButtonElement | null
}

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & ButtonGroupOptions

export interface ButtonIconProps extends HTMLAttributes<HTMLSpanElement>, ButtonIconOptions {
  ref?: HTMLSpanElement | null
}
