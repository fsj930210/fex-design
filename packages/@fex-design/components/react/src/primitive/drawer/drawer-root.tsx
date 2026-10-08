import {
  use,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react"
import {
  createDrawerController,
  type DrawerOptions,
  type DrawerSize,
} from "@fex-design/core/drawer/create-drawer-controller"
import type { DisclosureChangeInfo } from "@fex-design/core/disclosure/create-disclosure"
import { shallowEqualObject } from "@fex-design/utils"
import { useIsomorphicLayoutEffect } from "@fex-design/react/hooks/use-isomorphic-layout-effect"
import { useLazyRef } from "@fex-design/react/hooks/use-lazy-ref"
import { useMemoizedFn } from "@fex-design/react/hooks/use-memoized-fn"
import { DrawerContext } from "./drawer-context"

export interface DrawerRootProps extends DrawerOptions {
  children?: ReactNode
  size?: DrawerSize
  defaultSize?: DrawerSize
  resizable?: boolean
  minSize?: number
  maxSize?: number
  onSizeChange?: (size: number) => void
}
export type DrawerProps = DrawerRootProps

export function DrawerRoot({
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
  placement = "right",
  size,
  defaultSize = "md",
  resizable = false,
  minSize = 240,
  maxSize,
  onSizeChange,
  ...options
}: DrawerRootProps) {
  const parent = use(DrawerContext)
  const depth = (parent?.depth ?? -1) + 1
  const controlled = openProp !== undefined
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const handleOpenChange = useMemoizedFn((next: boolean, info: DisclosureChangeInfo) =>
    onOpenChange?.(next, info),
  )
  const drawerOptions = {
    ...options,
    defaultOpen,
    placement,
    onOpenChange: handleOpenChange,
    ...(controlled ? { open: openProp } : {}),
  }
  const drawer = useLazyRef(() => createDrawerController(drawerOptions)).current
  const latest = useRef(drawerOptions)
  useIsomorphicLayoutEffect(() => {
    if (!shallowEqualObject(latest.current, drawerOptions)) {
      latest.current = drawerOptions
      drawer.setOptions(drawerOptions)
    }
  })
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      queueMicrotask(() => {
        if (!mountedRef.current) drawer.destroy()
      })
    }
  }, [drawer])
  const contentId = useId()
  return (
    <DrawerContext.Provider
      value={{
        drawer,
        contentId,
        triggerRef,
        mask: options.mask ?? true,
        depth,
        resizeOptions: {
          ...(size === undefined ? {} : { size }),
          resizable,
          minSize,
          ...(maxSize === undefined ? {} : { maxSize }),
          ...(onSizeChange === undefined ? {} : { onSizeChange }),
        },
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export { DrawerRoot as Drawer }
