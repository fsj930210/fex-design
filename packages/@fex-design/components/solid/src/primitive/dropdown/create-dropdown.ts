import { createEffect, onCleanup, untrack, useContext, type Accessor } from 'solid-js'
import { createDropdown as createCoreDropdown } from '@fex-design/core/dropdown/create-dropdown'
import type { DropdownOptions } from '@fex-design/core/dropdown/types'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { PopoverContext } from '../popover/popover-context'

/** Independent Solid adapter for custom Dropdown hosts. */
export function createDropdown(options: Accessor<DropdownOptions> = () => ({})) {
  const parent = useContext(PopoverContext)
  const controller = createCoreDropdown(untrack(options), parent?.overlay)
  const snapshot = createCoreStoreSignal(controller.overlay)
  const menuSnapshot = createCoreStoreSignal(controller.menu)
  // Reactive options synchronize the external core controller; cleanup belongs to the Solid owner.
  createEffect(() => {
    const current = options()
    const next = {
      popoverProps: current.popoverProps ? { ...current.popoverProps } : undefined,
      menuProps: current.menuProps ? { ...current.menuProps } : undefined,
      closeOnSelect: current.closeOnSelect,
    }
    untrack(() => controller.setOptions(next))
  })
  onCleanup(() => controller.destroy())
  return {
    controller,
    menuSnapshot,
    popover: {
      overlay: controller.overlay,
      snapshot,
      hoverAncestors: controller.overlay.ancestors,
      triggerElement: { current: null },
      contentElement: { current: null },
      arrowElement: { current: null },
    },
  }
}
