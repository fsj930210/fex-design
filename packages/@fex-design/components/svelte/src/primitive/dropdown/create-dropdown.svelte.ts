import { getContext, onDestroy, untrack } from 'svelte'
import { createDropdown as createCoreDropdown } from '@fex-design/core/dropdown/create-dropdown'
import type { DropdownOptions } from '@fex-design/core/dropdown/types'
import { readableCoreStore } from '@fex-design/svelte/stores/core-store'
import { popoverContextKey, type PopoverContext } from '../popover/popover-context'

/** Standalone rune adapter for custom Dropdown hosts. */
export function createDropdown(options: () => DropdownOptions = () => ({})) {
  const parent = getContext<PopoverContext | undefined>(popoverContextKey)
  const controller = createCoreDropdown(untrack(options), parent?.overlay)
  const popover: PopoverContext = {
    overlay: controller.overlay,
    snapshot: readableCoreStore(controller.overlay),
    hoverAncestors: controller.overlay.ancestors,
    triggerElement: { current: null },
    contentElement: { current: null },
    arrowElement: { current: null },
  }
  // Reactive configuration synchronizes the external controller; Svelte owns effect cleanup.
  $effect(() => {
    const current = options()
    const next = {
      popoverProps: current.popoverProps ? { ...current.popoverProps } : undefined,
      menuProps: current.menuProps ? { ...current.menuProps } : undefined,
      closeOnSelect: current.closeOnSelect,
    }
    untrack(() => controller.setOptions(next))
  })
  onDestroy(() => controller.destroy())
  return { controller, popover, menuSnapshot: readableCoreStore(controller.menu) }
}
