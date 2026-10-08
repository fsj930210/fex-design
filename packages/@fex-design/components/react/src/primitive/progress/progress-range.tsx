import { progressLineRangeClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type CSSProperties, type Ref } from 'react'
import { useProgressContext } from './progress-context'

export interface ProgressRangeProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
  value?: number
  offset?: number
}
export function ProgressRange({
  ref,
  value,
  offset,
  className,
  style,
  ...props
}: ProgressRangeProps) {
  const context = useProgressContext('ProgressRange')
  const percentage =
    value !== undefined
      ? Math.min(1, Math.max(0, (value - context.min) / (context.max - context.min)))
      : context.percentage
  const rangeStyle: CSSProperties = {
    width: percentage !== null ? `${percentage * 100}%` : undefined,
    left: offset !== undefined ? `${offset}%` : undefined,
    ...style,
  }
  return (
    <div
      {...props}
      ref={ref}
      data-slot="progress-range"
      data-status={context.status}
      className={cn(progressLineRangeClassName, offset !== undefined && 'absolute top-0', className)}
      style={rangeStyle}
    />
  )
}
