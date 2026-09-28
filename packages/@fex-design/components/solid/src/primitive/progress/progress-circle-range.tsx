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

export interface ProgressCircleRangeProps extends JSX.CircleSVGAttributes<SVGCircleElement> {
  color?: ProgressColor
  gapDegree?: number
}

export function ProgressCircleRange(props: ProgressCircleRangeProps) {
  const [local, others] = splitProps(props, ["color", "gapDegree", "class", "style"])
  const context = useProgressContext("ProgressCircleRange")

  const size = createMemo(() => context().size ?? 48)
  const thickness = createMemo(() => context().thickness ?? 4)
  const geometry = createMemo(() =>
    getProgressGeometry({
      value: context().value,
      min: context().min,
      max: context().max,
      size: size(),
      thickness: thickness(),
      variant: context().variant,
      gapDegree: local.gapDegree,
    })
  )

  const strokeColor = createMemo(() => {
    const c = local.color ?? context().color
    return typeof c === "string" ? c : "currentColor"
  })

  return (
    <circle
      {...others}
      cx={geometry().center}
      cy={geometry().center}
      r={geometry().radius}
      fill="none"
      stroke={strokeColor()}
      stroke-width={thickness()}
      stroke-dasharray={geometry().rangeDasharray}
      stroke-dashoffset={geometry().dashOffset}
      stroke-linecap={context().linecap ?? "round"}
      pathLength={100}
      data-slot="progress-circle-range"
      data-status={context().status}
      class={cn(progressCircleRangeClassName, local.class)}
      style={local.style}
    />
  )
}
