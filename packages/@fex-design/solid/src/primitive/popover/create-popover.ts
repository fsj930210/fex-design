import { createEffect, onCleanup, untrack, useContext } from 'solid-js'
import { createPopover as createCorePopover } from '@fex-design/core/popover/create-popover'
import type { PopoverOptions } from '@fex-design/core/popover/types'
import { createCoreStoreSignal } from '../../primitives/create-core-store-signal'
import { PopoverContext, type PopoverContextValue } from './popover-context'

export function createPopover(options: () => PopoverOptions): PopoverContextValue {
  const parent = useContext(PopoverContext)
  const overlay = createCorePopover(options(), parent?.overlay)
  // Read prop accessors inside the effect to synchronize the external instance.
  // The owner disposes the effect; onCleanup releases the controller.
  createEffect(() => {
    const next = { ...options() }
    untrack(() => overlay.setOptions(next))
  })
  onCleanup(() => overlay.destroy())
  return {
    overlay,
    snapshot: createCoreStoreSignal(overlay),

    arrowElement: { current: null },
    contentElement: { current: null },
    triggerElement: { current: null },
    hoverAncestors: overlay.ancestors,
  }
}
