import { useRef } from 'react'
import type { ScrollbarOptions } from '@fex-design/core/scrollbar/types'
import { createScrollbarController } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'

/** Standalone logic for custom markup using the documented data-slot contract. */
export function useScrollbar<T extends HTMLElement = HTMLDivElement>(
  options: ScrollbarOptions = {},
) {
  const controller = useLazyRef(() => createScrollbarController()).current
  const rootRef = useRef<T | null>(null)
  const connected = useRef<T | null>(null)
  // Synchronize committed props to the external DOM controller after each render.
  // setOptions compares policies; scroll notifications never update React state here.
  useIsomorphicLayoutEffect(() => {
    controller.setOptions(options)
    if (rootRef.current !== connected.current) {
      controller.destroy()
      connected.current = rootRef.current
      if (rootRef.current) controller.connect(rootRef.current)
    }
  })
  useIsomorphicLayoutEffect(() => {
    return () => {
      controller.destroy()
      connected.current = null
    }
  }, [controller])
  return { controller, rootRef }
}
