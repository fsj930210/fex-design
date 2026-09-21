import type { PopoverController } from '@fex-design/core/popover/create-popover'
import type { Readable } from 'svelte/store'
export const popoverContextKey = Symbol('Popover')

export interface PopoverContext {
  arrowElement: { current: HTMLElement | null }
  overlay: PopoverController
  hoverAncestors: readonly PopoverController[]
  snapshot: Readable<ReturnType<PopoverController['getSnapshot']>>
  contentElement: { current: HTMLElement | null }
  triggerElement: { current: HTMLElement | null }
}
