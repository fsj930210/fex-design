import { drawerContentClassName } from "@fex-design/components-styles/drawer"
import type { DrawerPlacement, DrawerSize } from "@fex-design/core/drawer/create-drawer-controller"
import { cn } from "@fex-design/utils"
import { use, type ComponentProps, type KeyboardEvent, type Ref } from "react"
import { useCoreStore } from "@fex-design/react/hooks/use-core-store"
import { useMemoizedFn } from "@fex-design/react/hooks/use-memoized-fn"
import { useResize } from "@fex-design/react/hooks/use-resize"
import { DrawerContext, DrawerResizeContext } from "./drawer-context"

const edges: Record<DrawerPlacement, "left" | "right" | "top" | "bottom"> = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
}
const presets: Record<string, number | string> = {
  sm: 320,
  md: 400,
  lg: 560,
  xl: 720,
  full: "100%",
}
function px(value: DrawerSize | undefined) {
  if (typeof value === "number") return `${value}px`
  return `${presets[value ?? "md"] ?? value ?? 400}${typeof (presets[value ?? "md"] ?? value) === "number" ? "px" : ""}`
}

export interface DrawerContentProps extends ComponentProps<"div"> {
  placement?: DrawerPlacement
  size?: DrawerSize
  ref?: Ref<HTMLDivElement>
}

export function DrawerContent({
  children,
  className,
  placement,
  size = "md",
  style,
  ref,
  onKeyDown,
  ...props
}: DrawerContentProps) {
  const context = use(DrawerContext)
  if (!context) throw new Error("DrawerContent must be used inside DrawerRoot")
  const { drawer, contentId, resizeOptions } = context
  const snapshot = useCoreStore(drawer)
  const currentPlacement = placement ?? snapshot.placement
  const configuredSize =
    size === "md" && resizeOptions.size !== undefined ? resizeOptions.size : size
  const initial =
    typeof configuredSize === "number"
      ? configuredSize
      : Number.parseInt(String(presets[configuredSize as string] ?? configuredSize), 10) || 400
  const resize = useResize({
    defaultRect: {
      x: 0,
      y: 0,
      width: currentPlacement === "left" || currentPlacement === "right" ? initial : 0,
      height: currentPlacement === "top" || currentPlacement === "bottom" ? initial : 0,
    },
    edges: [edges[currentPlacement]],
    disabled: !resizeOptions.resizable,
    ...(currentPlacement === "left" || currentPlacement === "right"
      ? {
          ...(resizeOptions.minSize === undefined ? {} : { minWidth: resizeOptions.minSize }),
          ...(resizeOptions.maxSize === undefined ? {} : { maxWidth: resizeOptions.maxSize }),
        }
      : {
          ...(resizeOptions.minSize === undefined ? {} : { minHeight: resizeOptions.minSize }),
          ...(resizeOptions.maxSize === undefined ? {} : { maxHeight: resizeOptions.maxSize }),
        }),
    onResize: (rect) => {
      const next =
        currentPlacement === "left" || currentPlacement === "right" ? rect.width : rect.height
      resizeOptions.onSizeChange?.(next)
    },
  })
  const contentRef = useMemoizedFn((element: HTMLDivElement | null) => {
    drawer.setLayerElement(element)
    resize.getTargetProps().ref(element)
    if (typeof ref === "function") ref(element)
    else if (ref && "current" in ref) ref.current = element
  })
  if (!snapshot.mounted) return null
  return (
    <DrawerResizeContext value={resize}>
      <div
        {...props}
        ref={contentRef}
        id={contentId}
        role="dialog"
        tabIndex={-1}
        data-slot="drawer-content"
        data-placement={currentPlacement}
        data-state={snapshot.open ? "open" : "closed"}
        data-phase={snapshot.phase}
        style={{ "--drawer-size": px(configuredSize), ...style } as React.CSSProperties}
        className={cn(drawerContentClassName({ placement: currentPlacement }), className)}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
          onKeyDown?.(e)
          if (!e.defaultPrevented && e.key === "Escape")
            drawer.dismiss.escapeKey({
              target: e.target,
              currentTarget: e.currentTarget,
              event: e.nativeEvent,
            })
        }}
      >
        {children}
      </div>
    </DrawerResizeContext>
  )
}
