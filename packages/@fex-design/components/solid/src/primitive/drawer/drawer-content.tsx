import { drawerContentClassName } from "@fex-design/components-styles/drawer"
import type { DrawerPlacement, DrawerSize } from "@fex-design/core/drawer/create-drawer-controller"
import { cn } from "@fex-design/utils"
import { onCleanup, Show, type JSX, type ParentProps } from "solid-js"
import { createResize } from "@fex-design/solid/primitives/create-resize"
import { useDrawer } from "./drawer-context"

export type DrawerContentProps = ParentProps &
  JSX.HTMLAttributes<HTMLDivElement> & { size?: DrawerSize; placement?: DrawerPlacement }

export function DrawerContent(props: DrawerContentProps) {
  const context = useDrawer("DrawerContent")
  const { drawer, snapshot, placement, resizeOptions } = context
  const currentPlacement = () => props.placement ?? placement()
  const configuredSize = () => props.size ?? resizeOptions.size() ?? "md"
  const numericSize = () =>
    typeof configuredSize() === "number"
      ? (configuredSize() as number)
      : Number.parseInt(
          ({ sm: "320", md: "400", lg: "560", xl: "720", full: "100" } as Record<string, string>)[
            String(configuredSize())
          ] ?? String(configuredSize()),
          10,
        ) || 400
  const edge = () =>
    ({ left: "right", right: "left", top: "bottom", bottom: "top" })[currentPlacement()] as any
  const resize = createResize({
    defaultRect: {
      x: 0,
      y: 0,
      width: currentPlacement() === "left" || currentPlacement() === "right" ? numericSize() : 0,
      height: currentPlacement() === "top" || currentPlacement() === "bottom" ? numericSize() : 0,
    },
    edges: [edge()],
    disabled: !resizeOptions.resizable(),
    ...(currentPlacement() === "left" || currentPlacement() === "right"
      ? { minWidth: resizeOptions.minSize(), maxWidth: resizeOptions.maxSize() }
      : { minHeight: resizeOptions.minSize(), maxHeight: resizeOptions.maxSize() }),
    onResize: (rect) =>
      resizeOptions.onSizeChange()?.(
        currentPlacement() === "left" || currentPlacement() === "right" ? rect.width : rect.height,
      ),
  })
  context.resize = resize
  const size = () =>
    typeof configuredSize() === "number"
      ? `${configuredSize()}px`
      : ((
          { sm: "320px", md: "400px", lg: "560px", xl: "720px", full: "100%" } as Record<
            string,
            string
          >
        )[String(configuredSize())] ?? String(configuredSize()))
  onCleanup(() => {
    drawer.setLayerElement(null)
    resize.setTarget(null)
    if (context.resize === resize) context.resize = undefined
  })
  return (
    <Show when={snapshot().mounted}>
      <div
        {...props}
        ref={(el) => {
          drawer.setLayerElement(el)
          resize.setTarget(el)
        }}
        role="dialog"
        tabindex="-1"
        data-slot="drawer-content"
        data-placement={currentPlacement()}
        data-state={snapshot().open ? "open" : "closed"}
        data-phase={snapshot().phase}
        style={{ "--drawer-size": size() }}
        class={cn(drawerContentClassName({ placement: currentPlacement() }), props.class)}
        onKeyDown={(e) => {
          ;(props.onKeyDown as any)?.(e)
          if (e.key === "Escape")
            drawer.dismiss.escapeKey({ target: e.target, currentTarget: e.currentTarget, event: e })
        }}
      >
        {props.children}
      </div>
    </Show>
  )
}
