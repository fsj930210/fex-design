import { progressCircleRangeClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import type { ProgressLinecap } from '@fex-design/core/progress/types'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type Ref } from 'react'
import { useProgressContext } from './progress-context'
export interface ProgressCircleRangeProps extends ComponentProps<'circle'> {
  ref?: Ref<SVGCircleElement>
  linecap?: ProgressLinecap
  gapDegree?: number
}
export function ProgressCircleRange({
  ref,
  className,
  style,
  linecap,
  gapDegree,
  ...props
}: ProgressCircleRangeProps) {
  const context = useProgressContext('ProgressCircleRange')
  const size = context.size ?? 48
  const thickness = context.thickness ?? 4
  const geometry = getProgressGeometry({
    value: context.value,
    min: context.min,
    max: context.max,
    size,
    thickness,
    variant: context.variant,
    gapDegree,
  })
  return (
    <circle
      {...props}
      ref={ref}
      cx={geometry.center}
      cy={geometry.center}
      r={geometry.radius}
      fill="none"
      stroke={props.stroke ?? 'currentColor'}
      strokeWidth={thickness}
      strokeDasharray={geometry.rangeDasharray}
      strokeDashoffset={geometry.dashOffset}
      strokeLinecap={linecap ?? 'round'}
      pathLength={100}
      data-slot="progress-circle-range"
      data-status={context.status}
      className={cn(progressCircleRangeClassName, className)}
      style={style}
    />
  )
}
