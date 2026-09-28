import {
  progressCircleClassName,
  progressCircleRangeClassName,
  progressCircleTrackClassName,
  progressLabelClassName,
  progressLineClassName,
  progressLineRangeClassName,
  progressValueClassName,
} from "@fex-design/components-styles/progress"
import {
  getLinearProgressBackground,
  getProgressGeometry,
} from "@fex-design/core/progress/progress"
import type { ProgressColor } from "@fex-design/core/progress/types"
import { cn } from "@fex-design/utils"
import {
  createMemo,
  splitProps,
  type JSX,
  type ParentProps,
} from "solid-js"
import { useProgressContext } from "./progress-context"

export interface ProgressRangeProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value?: number
  offset?: number
  color?: ProgressColor
}

export function ProgressRange(props: ProgressRangeProps) {
  const [local, others] = splitProps(props, ["value", "offset", "color", "class", "style"])
  const context = useProgressContext("ProgressRange")

  const percentage = createMemo(() => {
    if (local.value !== undefined) {
      return Math.min(1, Math.max(0, (local.value - context().min) / (context().max - context().min)))
    }
    return context().percentage
  })

  const rangeStyle = createMemo<JSX.CSSProperties>(() => {
    const p = percentage()
    const width = p !== null ? `${p * 100}%` : undefined
    const left = local.offset !== undefined ? `${local.offset}%` : undefined
    const bg = getLinearProgressBackground(local.color ?? context().color)
    return {
      width,
      left,
      ...(bg ? { background: bg } : {}),
      ...(typeof local.style === "object" ? local.style : {}),
    }
  })

  return (
    <div
      {...others}
      data-slot="progress-range"
      data-status={context().status}
      class={cn(progressLineRangeClassName, local.class)}
      style={rangeStyle()}
    />
  )
}

