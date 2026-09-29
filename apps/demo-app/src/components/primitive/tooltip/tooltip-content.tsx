import type { CSSProperties, HTMLAttributes, PointerEvent, Ref } from "react"
import { cn } from "@/lib/utils"
import { useComposedRef } from "@/hooks/use-composed-ref"
import { useMemoizedFn } from "@/hooks/use-memoized-fn"
import { useTooltip } from "./use-tooltip"

const tooltipContentClassName =
  "z-[var(--floating-z-index,50)] w-max max-w-xs overflow-hidden rounded-[var(--radius-md)] bg-[var(--elevated-background)] px-3 py-1.5 text-xs text-[var(--elevated-foreground)] shadow-[var(--shadow-md)] border border-[var(--border)] outline-none origin-[var(--floating-transform-origin)] will-change-[opacity,transform] data-[state=open]:scale-100 data-[state=open]:opacity-100 data-[phase=closing]:pointer-events-none data-[phase=closing]:scale-95 data-[phase=closing]:opacity-0 data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0 transition-[opacity,transform] duration-140 ease-[cubic-bezier(0.2,0,0,1)]"

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
