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

export interface ProgressCircleTrackProps extends JSX.CircleSVGAttributes<SVGCircleElement> {
  gapDegree?: number
}

export function ProgressCircleTrack(props: ProgressCircleTrackProps) {
  const [local, others] = splitProps(props, ["gapDegree", "class", "style"])
  const context = useProgressContext("ProgressCircleTrack")

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

  return (
    <circle
      {...others}
      cx={geometry().center}
      cy={geometry().center}
      r={geometry().radius}
      fill="none"
      stroke={context().trackColor ?? "currentColor"}
      stroke-width={thickness()}
      stroke-dasharray={geometry().trackDasharray}
      stroke-linecap={context().trackLinecap ?? "round"}
      pathLength={100}
      data-slot="progress-circle-track"
      class={cn(progressCircleTrackClassName, local.class)}
      style={local.style}
    />
  )
}

