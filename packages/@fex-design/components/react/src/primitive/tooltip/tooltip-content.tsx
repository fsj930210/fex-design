import type { CSSProperties, HTMLAttributes, PointerEvent, Ref } from "react"
import { tooltipContentClassName } from "@fex-design/components-styles/tooltip"
import { cn } from "@fex-design/utils"
import { useComposedRef } from "@fex-design/react/hooks/use-composed-ref"
import { useMemoizedFn } from "@fex-design/react/hooks/use-memoized-fn"
import { useTooltip } from "./use-tooltip"

function toEventInfo(event: PointerEvent<HTMLElement>) {
  return { target: event.target, currentTarget: event.currentTarget, event }
}

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  color?: string
}

export function TooltipContent({
  children,
  color,
  className,
  style,
  ref,
  onPointerEnter,
  onPointerLeave,
  ...props
}: TooltipContentProps) {
  const { contentId, overlay, snapshot } = useTooltip("TooltipContent")
  const setContent = useMemoizedFn((element: HTMLDivElement | null) =>
    overlay.setFloatingElement(element),
  )
  const composedRef = useComposedRef<HTMLDivElement>(setContent, ref)

  if (!snapshot.mounted) {
    return null
  }

  return (
    <div
      {...props}
      id={contentId}
      ref={composedRef}
      role="tooltip"
      data-slot="tooltip-content"
      data-state={snapshot.open ? "open" : "closed"}
      data-phase={snapshot.phase}
      data-side={snapshot.side}
      data-align={snapshot.align}
      data-placement={snapshot.placement}
      className={cn(tooltipContentClassName, className)}
      style={{
        position: "var(--floating-strategy, absolute)",
        left: "var(--floating-x, 0px)",
        top: "var(--floating-y, 0px)",
        transformOrigin: "var(--floating-transform-origin)",
        ...(color ? ({ "--tooltip-background": color } as CSSProperties) : {}),
        ...style,
      } as CSSProperties}
      onPointerEnter={(event: PointerEvent<HTMLDivElement>) => {
        onPointerEnter?.(event)
        if (!event.defaultPrevented) overlay.content.pointerEnter(toEventInfo(event))
      }}
      onPointerLeave={(event: PointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(event)
        if (!event.defaultPrevented) overlay.content.pointerLeave(toEventInfo(event))
      }}
    >
      {children}
    </div>
  )
}
