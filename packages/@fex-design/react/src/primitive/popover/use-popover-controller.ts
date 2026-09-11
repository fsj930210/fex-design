import { use, useRef } from 'react'
import { createPopover } from '@fex-design/core/popover/create-popover'
import type { PopoverOptions } from '@fex-design/core/popover/types'
import { shallowEqualObject } from '@fex/utils'
import { useLazyRef } from '../../hooks/use-lazy-ref'
import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect'
import useUnmount from '../../hooks/use-unmount'
import { PopoverContext } from './popover-context'

/** May be consumed without rendering the default Popover components. */
export function usePopover(options: PopoverOptions = {}) {
  const parent = use(PopoverContext)
  const overlay = useLazyRef(() => createPopover(options, parent?.overlay)).current
  const previousOptions = useRef(options)
  const triggerRef = useRef<HTMLElement | null>(null)
  const arrowRef = useRef<HTMLElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    // Core is an external store: publish prop changes only after React commits.
    if (shallowEqualObject(previousOptions.current, options)) return
    previousOptions.current = options
    overlay.setOptions(options)
  })
  useUnmount(() => overlay.destroy())

  return useLazyRef(() => ({
    overlay,
    triggerRef,
    arrowRef,
    hoverAncestors: overlay.ancestors,
  })).current
}
