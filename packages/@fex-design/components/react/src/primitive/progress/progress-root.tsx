import { progressRootClassName } from '@fex-design/components-styles/progress'
import { normalizeProgressValue, resolveProgressStatus } from '@fex-design/core/progress/progress'
import type {
  ProgressContextValue,
  ProgressStatus,
  ProgressVariant,
} from '@fex-design/core/progress/types'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type Ref } from 'react'
import { ProgressContext } from './progress-context'

export interface ProgressProps extends Omit<ComponentProps<'div'>, 'color'> {
  ref?: Ref<HTMLDivElement>
  value?: number | null
  min?: number
  max?: number
  variant?: ProgressVariant
  status?: ProgressStatus
  size?: number
  thickness?: number
}

export function Progress({
  ref,
  value = 0,
  min = 0,
  max = 100,
  variant = 'line',
  status,
  size = 48,
  thickness = variant === 'line' ? 8 : 4,
  className,
  style,
  children,
  ...props
}: ProgressProps) {
  const normalized = normalizeProgressValue(value, min, max)
  const resolvedStatus = resolveProgressStatus(status, value, min, max)

  const contextValue: ProgressContextValue = {
    value: normalized.value,
    min: normalized.min,
    max: normalized.max,
    percentage: normalized.percentage,
    status: resolvedStatus,
    variant,
    thickness,
    size,
  }

  return (
    <ProgressContext value={contextValue}>
      <div
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuemin={normalized.min}
        aria-valuemax={normalized.max}
        aria-valuenow={normalized.value ?? undefined}
        aria-valuetext={
          normalized.percentage !== null ? `${Math.round(normalized.percentage * 100)}%` : undefined
        }
        data-slot="progress"
        data-status={resolvedStatus}
        data-variant={variant}
        className={cn(progressRootClassName, className)}
        style={style}
      >
        {children}
      </div>
    </ProgressContext>
  )
}

export { Progress as ProgressRoot }
export type ProgressRootProps = ProgressProps
