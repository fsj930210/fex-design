import { drawerResizeHandleClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import { Show, type JSX } from "solid-js"
import { useDrawer } from "./drawer-context"

export type DrawerResizeHandleProps = JSX.HTMLAttributes<HTMLDivElement>

export function DrawerResizeHandle(props: DrawerResizeHandleProps) {
  const context = useDrawer("DrawerResizeHandle")
  const edge = () =>
    ({ left: "right", right: "left", top: "bottom", bottom: "top" })[context.placement()] as any
  return (
    <Show when={context.resize}>
      {(resize) => (
        <div
          {...props}
          {...resize().getHandleProps(edge())}
          data-slot="drawer-resize-handle"
          data-edge={edge()}
          class={cn(drawerResizeHandleClassName, props.class)}
        />
      )}
    </Show>
  )
}
