import type { ButtonOptions } from '@fex-design/core/button/types'
import type { Snippet } from 'svelte'
import type { HTMLButtonAttributes } from 'svelte/elements'

export interface ButtonProps extends Omit<HTMLButtonAttributes, 'disabled'>, ButtonOptions {
  icon?: Snippet
  loadingIndicator?: Snippet
  ref?: HTMLButtonElement | null
}
