import type { CSSProperties, HTMLAttributes, Ref } from "react"
import { getTooltipArrowPosition } from "@fex-design/core/tooltip/create-tooltip"
import { tooltipArrowClassName } from "@fex-design/components-styles/tooltip"
import { cn } from "@fex-design/utils"
import { useComposedRef } from "@fex-design/react/hooks/use-composed-ref"
import { useMemoizedFn } from "@fex-design/react/hooks/use-memoized-fn"
import { useTooltip } from "./use-tooltip"

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
