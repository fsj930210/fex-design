import { use, useRef } from 'react'
import { createPopover } from './utils'
import type { PopoverOptions } from './utils'
import { shallowEqualObject } from '@demo/utils'
import { useLazyRef } from '@demo/hooks/use-lazy-ref'
import { useIsomorphicLayoutEffect } from '@demo/hooks/use-isomorphic-layout-effect'
import useUnmount from '@demo/hooks/use-unmount'
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
