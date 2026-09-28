import { progressRootClassName } from "@fex-design/components-styles/progress"
import { normalizeProgressValue, resolveProgressStatus } from "@fex-design/core/progress/progress"
import type {
  ProgressColor,
  ProgressContextValue,
  ProgressLinecap,
  ProgressStatus,
  ProgressVariant,
} from "@fex-design/core/progress/types"
import { cn } from "@fex-design/utils"
import {
  createMemo,
  splitProps,
  type JSX,
  type ParentProps,
} from "solid-js"
import { ProgressContext } from "./progress-context"
import { ProgressCircle } from "./progress-circle"
import { ProgressCircleRange } from "./progress-circle-range"
import { ProgressCircleTrack } from "./progress-circle-track"
import { ProgressRange } from "./progress-range"
import { ProgressTrack } from "./progress-track"
import { ProgressValue } from "./progress-value"

export { ProgressCircle } from "./progress-circle"
export { ProgressCircleRange } from "./progress-circle-range"
export { ProgressCircleTrack } from "./progress-circle-track"
export { ProgressLabel } from "./progress-label"
export { ProgressRange } from "./progress-range"
export { ProgressTrack } from "./progress-track"
export { ProgressValue } from "./progress-value"
export { useProgressContext } from "./progress-context"

export interface ProgressProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value?: number | null
  min?: number
  max?: number
  variant?: ProgressVariant
  status?: ProgressStatus
  size?: number
  thickness?: number
  linecap?: ProgressLinecap
  trackLinecap?: ProgressLinecap
  color?: ProgressColor
  trackColor?: string
  gapDegree?: number
  gapPlacement?: "top" | "bottom" | "start" | "end"
}

export function Progress(props: ParentProps<ProgressProps>) {
  const [local, others] = splitProps(props, [
    "value",
    "min",
    "max",
    "variant",
    "status",
    "size",
    "thickness",
    "linecap",
    "trackLinecap",
    "color",
    "trackColor",
    "gapDegree",
    "gapPlacement",
    "class",
    "children",
  ])

  const min = () => local.min ?? 0
  const max = () => local.max ?? 100
  const variant = () => local.variant ?? "line"
  const status = () => resolveProgressStatus(local.status, local.value, min(), max())

  const normalized = createMemo(() => normalizeProgressValue(local.value, min(), max()))
  const contextValue = createMemo<ProgressContextValue>(() => ({
    value: normalized().value,
    min: normalized().min,
    max: normalized().max,
    percentage: normalized().percentage,
    status: status(),
    variant: variant(),
    color: local.color,
    trackColor: local.trackColor,
    linecap: local.linecap ?? "round",
    trackLinecap: local.trackLinecap,
    thickness: local.thickness ?? (variant() === "line" ? 8 : 4),
    size: local.size ?? 48,
  }))

  return (
    <ProgressContext.Provider value={contextValue}>
      <div
        {...others}
        role="progressbar"
        aria-valuemin={normalized().min}
        aria-valuemax={normalized().max}
        aria-valuenow={normalized().value ?? undefined}
        aria-valuetext={
          normalized().percentage !== null
            ? `${Math.round(normalized().percentage! * 100)}%`
            : undefined
        }
        data-slot="progress"
        data-status={status()}
        data-variant={variant()}
        class={cn(progressRootClassName, local.class)}
      >
        {local.children}
      </div>
    </ProgressContext.Provider>
  )
}
