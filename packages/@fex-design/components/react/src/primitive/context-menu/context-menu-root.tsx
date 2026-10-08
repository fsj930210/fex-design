import { useState, type ReactNode } from "react"
import { createContextMenuController } from "@fex-design/core/overlay/context-menu/create-context-menu-controller"
import type { ContextMenuOptions } from "@fex-design/core/overlay/context-menu/types"
import { useRef } from "react"
import { useIsomorphicLayoutEffect } from "@fex-design/react/hooks/use-isomorphic-layout-effect"
import useUnmount from "@fex-design/react/hooks/use-unmount"
import { ContextMenuContext } from "./context-menu-context"

export interface ContextMenuRootProps<T = unknown> extends Omit<ContextMenuOptions<T>, "onOpenChange"> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: ContextMenuOptions<T>["onOpenChange"]
  children?: ReactNode
}

export function ContextMenuRoot<T = unknown>({ children, ...props }: ContextMenuRootProps<T>) {
  const { open, defaultOpen, onOpenChange, ...options } = props
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false)
  const openValue = open ?? uncontrolledOpen
  const controllerRef = useRef<ReturnType<typeof createContextMenuController<T>> | null>(null)
  if (!controllerRef.current) {
    controllerRef.current = createContextMenuController<T>({
      ...options,
      open: openValue,
      onOpenChange: (nextOpen, info) => {
        if (open === undefined) setUncontrolledOpen(nextOpen)
        onOpenChange?.(nextOpen, info)
      },
    })
  }
  const controller = controllerRef.current
  useIsomorphicLayoutEffect(() => {
    controller.setOptions({
      ...options,
      open: openValue,
      onOpenChange: (nextOpen, info) => {
        if (open === undefined) setUncontrolledOpen(nextOpen)
        onOpenChange?.(nextOpen, info)
      },
    })
  }, [controller, openValue, open, onOpenChange, options])
  useUnmount(() => {
    controllerRef.current?.destroy()
    controllerRef.current = null
  })
  return <ContextMenuContext value={{ controller }}>{children}</ContextMenuContext>
}

export { ContextMenuRoot as ContextMenu }
