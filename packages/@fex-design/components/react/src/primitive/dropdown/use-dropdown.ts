import { use, useRef } from 'react'
import { createDropdown } from '@fex-design/core/dropdown/create-dropdown'
import type { DropdownOptions } from '@fex-design/core/dropdown/types'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import useUnmount from '@fex-design/react/hooks/use-unmount'
import { PopoverContext } from '../popover/popover-context'

/** Stable controller and contexts shared by the built-in parts. */
export function useDropdownBinding(options: DropdownOptions = {}) {
  const parent = use(PopoverContext)
  const controller = useLazyRef(() => createDropdown(options, parent?.overlay)).current
  const triggerRef = useRef<HTMLElement | null>(null)
  const arrowRef = useRef<HTMLElement | null>(null)
  // Controller options are synchronized after React commits.
  useIsomorphicLayoutEffect(() => controller.setOptions(options))
  useUnmount(() => controller.destroy())
  const popover = useLazyRef(() => ({
    overlay: controller.overlay,
    triggerRef,
    arrowRef,
    hoverAncestors: controller.overlay.ancestors,
  })).current
  return { controller, popover }
}

/** Standalone Dropdown behavior for consumers rendering their own elements. */
export function useDropdown(options: DropdownOptions = {}) {
  const binding = useDropdownBinding(options)
  const snapshot = useCoreStore(binding.controller.overlay)
  const menuSnapshot = useCoreStore(binding.controller.menu)
  return { ...binding, snapshot, menuSnapshot }
}
