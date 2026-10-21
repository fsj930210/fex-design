import type { ButtonIcon } from '../../primitive/button'
import type LoadingIcon from '../../icons/loading.svelte'
import type { ButtonOptions } from '@fex-design/core/button/types'
import type { ComponentProps, Snippet } from 'svelte'
import type { HTMLButtonAttributes } from 'svelte/elements'

export interface ButtonProps
  extends Omit<HTMLButtonAttributes, 'color' | 'disabled'>, ButtonOptions {
  startIconProps?:
    | Omit<ComponentProps<typeof ButtonIcon>, 'children' | 'placement' | 'data-icon'>
    | undefined
  endIconProps?:
    | Omit<ComponentProps<typeof ButtonIcon>, 'children' | 'placement' | 'data-icon'>
    | undefined
  loadingIconProps?:
    | Omit<ComponentProps<typeof LoadingIcon>, 'children' | 'aria-hidden'>
    | undefined
  icon?: Snippet
  loadingIndicator?: Snippet
  ref?: HTMLButtonElement | null
}
