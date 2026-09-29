import type { ComponentProps, CSSProperties, Ref } from "react"
import { popoverArrowClassName } from "@fex-design/components-styles/popover"
import { cn } from "@fex-design/utils"
import { useComposedRef } from "@fex-design/react/hooks/use-composed-ref"
import { useCoreStore } from "@fex-design/react/hooks/use-core-store"
import { useMemoizedFn } from "@fex-design/react/hooks/use-memoized-fn"
import { usePopoverContext } from "./popover-context"

export interface PopoverArrowProps extends ComponentProps<"div"> {
  ref?: Ref<HTMLDivElement>
}

export function PopoverArrow({ ref, className, style, ...props }: PopoverArrowProps) {
  const { arrowRef, overlay } = usePopoverContext("PopoverArrow")
  const snapshot = useCoreStore(overlay)
  const setArrowElement = useMemoizedFn((element: HTMLDivElement | null) => {
    arrowRef.current = element
    overlay.setArrowElement(element)
  })
  const composedRef = useComposedRef<HTMLDivElement>(setArrowElement, ref)

  if (!snapshot.arrow) {
    return null
  }

  const floatingArrowStyle =
    snapshot.side === "left" || snapshot.side === "right"
      ? { top: "var(--floating-arrow-y, 0px)" }
      : { left: "var(--floating-arrow-x, 0px)" }

  return (
    <div
      {...props}
      ref={composedRef}
      data-slot="popover-arrow"
      data-side={snapshot.side}
      className={cn(popoverArrowClassName, className)}
      style={{ ...floatingArrowStyle, ...style } as CSSProperties}
    />
  )
}
