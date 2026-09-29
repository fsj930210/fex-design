import type { CSSProperties, HTMLAttributes, Ref } from "react"
import { getTooltipArrowPosition } from "./utils"
import { cn } from "@/lib/utils"
import { useComposedRef } from "@/hooks/use-composed-ref"
import { useMemoizedFn } from "@/hooks/use-memoized-fn"
import { useTooltip } from "./use-tooltip"

const tooltipArrowClassName =
  "pointer-events-none absolute size-[var(--tooltip-arrow-size,8px)] bg-[var(--elevated-background)] border-[var(--border)] data-[side=top]:bottom-[-4px] data-[side=top]:border-b data-[side=top]:border-r data-[side=bottom]:top-[-4px] data-[side=bottom]:border-l data-[side=bottom]:border-t data-[side=left]:right-[-4px] data-[side=left]:border-r data-[side=left]:border-t data-[side=right]:left-[-4px] data-[side=right]:border-b data-[side=right]:border-l data-[side=top]:rotate-45 data-[side=bottom]:rotate-45 data-[side=left]:rotate-45 data-[side=right]:rotate-45"

export interface TooltipArrowProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
}

export function TooltipArrow({ ref, className, style, ...props }: TooltipArrowProps) {
  const { overlay, snapshot } = useTooltip("TooltipArrow")
  const setArrow = useMemoizedFn((element: HTMLDivElement | null) =>
    overlay.setArrowElement(element),
  )
  const composedRef = useComposedRef<HTMLDivElement>(setArrow, ref)
  const position = getTooltipArrowPosition(snapshot.side, snapshot.align)

  return (
    <div
      {...props}
      ref={composedRef}
      data-slot="tooltip-arrow"
      data-side={snapshot.side}
      data-align={snapshot.align}
      className={cn(tooltipArrowClassName, className)}
      style={{ ...position, ...style } as CSSProperties}
    />
  )
}
