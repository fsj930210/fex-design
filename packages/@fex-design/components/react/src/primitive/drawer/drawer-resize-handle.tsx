import { drawerResizeHandleClassName } from "@fex-design/components-styles/drawer"
import type { DrawerPlacement } from "@fex-design/core/drawer/create-drawer-controller"
import { cn } from "@fex-design/utils"
import { use, type ComponentProps } from "react"
import { useCoreStore } from "@fex-design/react/hooks/use-core-store"
import { DrawerContext, DrawerResizeContext } from "./drawer-context"

const edges: Record<DrawerPlacement, "left" | "right" | "top" | "bottom"> = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
}

export type DrawerResizeHandleProps = ComponentProps<"div">

export function DrawerResizeHandle({ className, ...props }: DrawerResizeHandleProps) {
  const context = use(DrawerContext)
  if (!context) throw new Error("DrawerResizeHandle must be used inside DrawerRoot")
  const snapshot = useCoreStore(context.drawer)
  const resize = use(DrawerResizeContext)
  const edge = edges[snapshot.placement]
  return (
    <div
      {...props}
      {...resize?.getHandleProps(edge)}
      data-slot="drawer-resize-handle"
      data-edge={edge}
      className={cn(drawerResizeHandleClassName, className)}
    />
  )
}
