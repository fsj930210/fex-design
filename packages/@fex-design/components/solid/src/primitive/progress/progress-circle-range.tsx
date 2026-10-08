import { progressCircleRangeClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import type { ProgressLinecap } from '@fex-design/core/progress/types'
import { cn } from '@fex-design/utils'
import { createMemo, splitProps, type JSX } from 'solid-js'
import { useProgressContext } from './progress-context'

export type ProgressCircleRangeProps = JSX.CircleSVGAttributes<SVGCircleElement> & {
  gapDegree?: number
  linecap?: ProgressLinecap
}

export function ProgressCircleRange(props: ProgressCircleRangeProps) {
  const [local, others] = splitProps(props, ['gapDegree', 'linecap', 'class', 'style'])
  const context = useProgressContext('ProgressCircleRange')
  const geometry = createMemo(() => getProgressGeometry({
    value: context().value, min: context().min, max: context().max,
    size: context().size ?? 48, thickness: context().thickness ?? 4,
    variant: context().variant, gapDegree: local.gapDegree,
  }))
  return (
    <circle {...others} cx={geometry().center} cy={geometry().center} r={geometry().radius}
      fill="none" stroke={others.stroke ?? 'currentColor'}
      stroke-width={context().thickness ?? 4} stroke-dasharray={geometry().rangeDasharray}
      stroke-dashoffset={geometry().dashOffset}
      stroke-linecap={local.linecap ?? 'round'} pathLength={100}
      data-slot="progress-circle-range" data-status={context().status}
      class={cn(progressCircleRangeClassName, local.class)} style={local.style} />
  )
}
