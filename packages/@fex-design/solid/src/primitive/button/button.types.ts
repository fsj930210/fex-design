import type { ButtonGroupOptions, ButtonIconOptions } from '@fex-design/core/button/types'
import type { JSX, ParentProps } from 'solid-js'

export type ButtonProps = ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>>

export type ButtonGroupProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement> & ButtonGroupOptions>

export type ButtonIconProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement> & ButtonIconOptions>
