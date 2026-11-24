import { inject, onScopeDispose, shallowRef, watchEffect } from 'vue'
import { createDropdown } from '@fex-design/core/dropdown/create-dropdown'
import type { DropdownOptions } from '@fex-design/core/dropdown/types'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { popoverKey } from '../popover/context'

/** Standalone composition API for a custom Dropdown. */
export function useDropdown(options: () => DropdownOptions = () => ({})) {
  const parent = inject(popoverKey, null)
  const controller = createDropdown(options(), parent?.overlay)
  const snapshot = useCoreStore(controller.overlay)
  const menuSnapshot = useCoreStore(controller.menu)
  const triggerElement = shallowRef<HTMLElement | null>(null)
  const arrowElement = shallowRef<HTMLElement | null>(null)
  // Reactive options synchronize the external controller after component updates.
  watchEffect(() => controller.setOptions(options()), { flush: 'post' })
  onScopeDispose(() => controller.destroy())
  return {
    controller,
    menuSnapshot,
    popover: {
      overlay: controller.overlay,
      snapshot,
      triggerElement,
      arrowElement,
      hoverAncestors: controller.overlay.ancestors,
    },
  }
}
