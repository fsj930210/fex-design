import { inject, onScopeDispose, shallowRef, watch } from 'vue'
import { createPopover } from '@fex-design/core/popover/create-popover'
import type { PopoverOptions } from '@fex-design/core/popover/types'
import { useCoreStore } from '../../composables/use-core-store'
import { popoverKey } from './context'

/** Standalone composition API for custom Popover markup. */
export function usePopover(options: () => PopoverOptions) {
  const parent = inject(popoverKey, null)
  const overlay = createPopover(options(), parent?.overlay)
  const snapshot = useCoreStore(overlay)
  const triggerElement = shallowRef<HTMLElement | null>(null)
  const arrowElement = shallowRef<HTMLElement | null>(null)
  // Props are Vue's boundary with the external Core instance. Scope disposal
  // removes the watcher; the same instance survives every reactive update.
  watch(() => ({ ...options() }), (next) => overlay.setOptions(next), { flush: 'post' })
  onScopeDispose(() => overlay.destroy())
  return {
    overlay, snapshot, triggerElement, arrowElement,

    hoverAncestors: overlay.ancestors,
  }
}
