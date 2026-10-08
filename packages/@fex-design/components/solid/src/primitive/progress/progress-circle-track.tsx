import { progressCircleTrackClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import type { ProgressLinecap } from '@fex-design/core/progress/types'
import { cn } from '@fex-design/utils'
import { createMemo, splitProps, type JSX } from 'solid-js'
import { useProgressContext } from './progress-context'

export type ProgressCircleTrackProps = JSX.CircleSVGAttributes<SVGCircleElement> & {
  gapDegree?: number
  trackLinecap?: ProgressLinecap
}

export function ProgressCircleTrack(props: ProgressCircleTrackProps) {
  const [local, others] = splitProps(props, ['gapDegree', 'trackLinecap', 'class', 'style'])
  const context = useProgressContext('ProgressCircleTrack')
  const geometry = createMemo(() => getProgressGeometry({
    value: context().value, min: context().min, max: context().max,
    size: context().size ?? 48, thickness: context().thickness ?? 4,
    variant: context().variant, gapDegree: local.gapDegree,
  }))
  return (
    <circle {...others} cx={geometry().center} cy={geometry().center} r={geometry().radius}
      fill="none" stroke={'currentColor'}
      stroke-width={context().thickness ?? 4} stroke-dasharray={geometry().trackDasharray}
      
      stroke-linecap={local.trackLinecap ?? 'round'} pathLength={100}
      data-slot="progress-circle-track" 
      class={cn(progressCircleTrackClassName, local.class)} style={local.style} />
  )
}
