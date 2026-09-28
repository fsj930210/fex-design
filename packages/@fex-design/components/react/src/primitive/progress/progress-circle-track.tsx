import { progressCircleTrackClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import type { ProgressLinecap } from '@fex-design/core/progress/types'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type Ref } from 'react'
import { useProgressContext } from './progress-context'
export interface ProgressCircleTrackProps extends ComponentProps<'circle'> {
  ref?: Ref<SVGCircleElement>
  gapDegree?: number
  trackLinecap?: ProgressLinecap
}
export function ProgressCircleTrack({
  ref,
  className,
  style,
  gapDegree,
  trackLinecap,
  ...props
}: ProgressCircleTrackProps) {
  const context = useProgressContext('ProgressCircleTrack')
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
      stroke="currentColor"
      strokeWidth={thickness}
      strokeDasharray={geometry.trackDasharray}
      strokeLinecap={trackLinecap ?? 'round'}
      pathLength={100}
      data-slot="progress-circle-track"
      className={cn(progressCircleTrackClassName, className)}
      style={style}
    />
  )
}
