import { getContext, onDestroy, untrack } from 'svelte'
import { createPopover as createCorePopover } from '@fex-design/core/popover/create-popover'
import type { PopoverOptions } from '@fex-design/core/popover/types'
import { readableCoreStore } from '@fex-design/svelte/stores/core-store'
import { popoverContextKey, type PopoverContext } from './popover-context'

/** Standalone rune adapter; Core owns all mutable open and presence state. */
export function createPopover(options: () => PopoverOptions): PopoverContext {
  const parent = getContext<PopoverContext | undefined>(popoverContextKey)
  const overlay = createCorePopover(options(), parent?.overlay)
  // Synchronize reactive props to the external instance after DOM commits.
  // Svelte disposes the effect with its owner; onDestroy releases Core listeners.
  $effect(() => {
    const next = { ...options() }
    untrack(() => overlay.setOptions(next))
  })
  onDestroy(() => overlay.destroy())
  return {
    overlay,
    snapshot: readableCoreStore(overlay),

    arrowElement: { current: null },
    contentElement: { current: null },
    triggerElement: { current: null },
    hoverAncestors: overlay.ancestors,
  }
}
