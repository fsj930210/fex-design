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

export interface ProgressLabelProps extends JSX.HTMLAttributes<HTMLSpanElement> {}

export function ProgressLabel(props: ParentProps<ProgressLabelProps>) {
  const [local, others] = splitProps(props, ["class", "children"])

  return (
    <span
      {...others}
      data-slot="progress-label"
      class={cn(progressLabelClassName, local.class)}
    >
      {local.children}
    </span>
  )
}

