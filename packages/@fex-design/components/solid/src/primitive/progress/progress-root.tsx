import { progressRootClassName } from "@fex-design/components-styles/progress"
import { normalizeProgressValue, resolveProgressStatus } from "@fex-design/core/progress/progress"
import type {
  ProgressContextValue,
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

export interface ProgressProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value?: number | null
  min?: number
  max?: number
  variant?: ProgressVariant
  status?: ProgressStatus
  size?: number
  thickness?: number
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
    "class",
    "children",
  ])

  const min = () => local.min ?? 0
  const max = () => local.max ?? 100
  const variant = () => local.variant ?? "line"
  const value = () => local.value === undefined ? 0 : local.value
  const status = () => resolveProgressStatus(local.status, value(), min(), max())

  const normalized = createMemo(() => normalizeProgressValue(value(), min(), max()))
  const contextValue = createMemo<ProgressContextValue>(() => ({
    value: normalized().value,
    min: normalized().min,
    max: normalized().max,
    percentage: normalized().percentage,
    status: status(),
    variant: variant(),
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

export { Progress as ProgressRoot }
export type ProgressRootProps = ProgressProps
