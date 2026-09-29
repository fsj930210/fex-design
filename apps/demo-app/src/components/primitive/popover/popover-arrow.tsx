import type { ComponentProps, CSSProperties, Ref } from "react"
import { cn } from "@/lib/utils"
import { useComposedRef } from "@/hooks/use-composed-ref"
import { useCoreStore } from "@/hooks/use-core-store"
import { useMemoizedFn } from "@/hooks/use-memoized-fn"
import { usePopoverContext } from "./popover-context"

export interface PopoverArrowProps extends ComponentProps<"div"> {
  ref?: Ref<HTMLDivElement>
}

const popoverArrowClassName =
  "pointer-events-none absolute size-[var(--popover-arrow-size,12px)] bg-[var(--popover-background,var(--elevated-background))] data-[side=top]:bottom-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=top]:border-b data-[side=top]:border-r data-[side=top]:border-[var(--popover-border,var(--border))] data-[side=bottom]:top-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=bottom]:border-l data-[side=bottom]:border-t data-[side=bottom]:border-[var(--popover-border,var(--border))] data-[side=left]:right-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=left]:border-r data-[side=left]:border-t data-[side=left]:border-[var(--popover-border,var(--border))] data-[side=right]:left-[calc(var(--popover-arrow-size,12px)/-2)] data-[side=right]:border-b data-[side=right]:border-l data-[side=right]:border-[var(--popover-border,var(--border))] data-[side=top]:rotate-45 data-[side=bottom]:rotate-45 data-[side=left]:rotate-45 data-[side=right]:rotate-45"

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
