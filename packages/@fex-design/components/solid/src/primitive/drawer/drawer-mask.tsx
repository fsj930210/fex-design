import { drawerMaskClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import { onCleanup, Show, type JSX } from "solid-js"
import { useDrawer } from "./drawer-context"

export type DrawerMaskProps = JSX.HTMLAttributes<HTMLDivElement>

export function DrawerMask(props: DrawerMaskProps) {
  const { drawer, snapshot, mask } = useDrawer("DrawerMask")
  onCleanup(() => drawer.setOverlayElement(null))
  return (
    <Show when={mask()}>
      <div
        {...props}
        ref={(element) => drawer.setOverlayElement(element)}
        data-slot="drawer-mask"
        data-state={snapshot().open ? "open" : "closed"}
        data-phase={snapshot().phase}
        class={cn(drawerMaskClassName, props.class)}
        onClick={(e) => {
          ;(props.onClick as any)?.(e)
          if (e.target === e.currentTarget)
            drawer.dismiss.overlayPointer({
              target: e.target,
              currentTarget: e.currentTarget,
              event: e,
            })
        }}
      />
    </Show>
  )
}
