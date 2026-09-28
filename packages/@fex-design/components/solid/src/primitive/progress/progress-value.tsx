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

export interface ProgressValueProps extends JSX.HTMLAttributes<HTMLSpanElement> {}

export function ProgressValue(props: ParentProps<ProgressValueProps>) {
  const [local, others] = splitProps(props, ["class", "children"])
  const context = useProgressContext("ProgressValue")

  return (
    <span
      {...others}
      data-slot="progress-value"
      data-status={context().status}
      class={cn(progressValueClassName, local.class)}
    >
      {local.children}
    </span>
  )
}

