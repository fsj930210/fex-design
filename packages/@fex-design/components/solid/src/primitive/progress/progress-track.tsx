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

export interface ProgressTrackProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function ProgressTrack(props: ParentProps<ProgressTrackProps>) {
  const [local, others] = splitProps(props, ["class", "style", "children"])
  const context = useProgressContext("ProgressTrack")

  return (
    <div
      {...others}
      data-slot="progress-track"
      data-status={context().status}
      class={cn(progressLineClassName, local.class)}
      style={{
        "background-color": context().trackColor,
        ...(typeof local.style === "object" ? local.style : {}),
      }}
    >
      {local.children}
    </div>
  )
}

