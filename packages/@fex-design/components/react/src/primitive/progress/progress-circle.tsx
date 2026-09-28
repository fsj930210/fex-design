import { progressCircleClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type Ref } from 'react'
import { useProgressContext } from './progress-context'
export interface ProgressCircleProps extends ComponentProps<'svg'> {
  ref?: Ref<SVGSVGElement>
  gapDegree?: number
  rotation?: number
}
export function ProgressCircle({
  ref,
  className,
  style,
  children,
  gapDegree,
  rotation,
  ...props
}: ProgressCircleProps) {
  const context = useProgressContext('ProgressCircle')
  const size = context.size ?? 48
  const geometry = getProgressGeometry({
    value: context.value,
    min: context.min,
    max: context.max,
    size,
    thickness: context.thickness ?? 4,
    variant: context.variant,
    gapDegree,
  })
  return (
    <svg
      {...props}
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      data-slot="progress-circle"
      data-status={context.status}
      className={cn(progressCircleClassName, className)}
      style={{ transform: `rotate(${rotation ?? geometry.rotation}deg)`, ...style }}
    >
      {children}
    </svg>
  )
}
