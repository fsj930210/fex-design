import { drawerMaskClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import { use, type ComponentProps, type MouseEvent, type Ref } from "react"
import { useCoreStore } from "@fex-design/react/hooks/use-core-store"
import { useMemoizedFn } from "@fex-design/react/hooks/use-memoized-fn"
import { DrawerContext } from "./drawer-context"

export interface DrawerMaskProps extends ComponentProps<"div"> {
  ref?: Ref<HTMLDivElement>
}

export function DrawerMask({ className, onClick, ref, ...props }: DrawerMaskProps) {
  const context = use(DrawerContext)
  if (!context) throw new Error("DrawerMask must be used inside DrawerRoot")
  const { drawer, mask } = context
  const snapshot = useCoreStore(drawer)
  const maskRef = useMemoizedFn((element: HTMLDivElement | null) => {
    drawer.setOverlayElement(element)
    if (typeof ref === "function") ref(element)
    else if (ref && "current" in ref) ref.current = element
  })
  if (!mask) return null
  return (
    <div
      {...props}
      ref={maskRef}
      data-slot="drawer-mask"
      data-state={snapshot.open ? "open" : "closed"}
      data-phase={snapshot.phase}
      className={cn(drawerMaskClassName, className)}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented && e.target === e.currentTarget) {
          drawer.dismiss.overlayPointer({
            target: e.target,
            currentTarget: e.currentTarget,
            event: e.nativeEvent,
          })
        }
      }}
    />
  )
}
