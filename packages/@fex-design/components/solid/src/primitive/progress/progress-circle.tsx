import { progressCircleClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import { cn } from '@fex-design/utils'
import { createMemo, splitProps, type JSX, type ParentProps } from 'solid-js'
import { useProgressContext } from './progress-context'

export interface ProgressCircleProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  gapDegree?: number
  rotation?: number
}

export function ProgressCircle(props: ParentProps<ProgressCircleProps>) {
  const [local, others] = splitProps(props, ["gapDegree", "rotation", "class", "style", "children"])
  const context = useProgressContext("ProgressCircle")

  const size = createMemo(() => context().size ?? 48)
  const geometry = createMemo(() =>
    getProgressGeometry({
      value: context().value,
      min: context().min,
      max: context().max,
      size: size(),
      thickness: context().thickness ?? 4,
      variant: context().variant,
      gapDegree: local.gapDegree,
    })
  )

  const style = () => typeof local.style === 'string'
    ? `transform: rotate(${local.rotation ?? geometry().rotation}deg); ${local.style}`
    : { transform: `rotate(${local.rotation ?? geometry().rotation}deg)`, ...local.style }

  return (
    <svg
      {...others}
      viewBox={`0 0 ${size()} ${size()}`}
      width={size()}
      height={size()}
      data-slot="progress-circle"
      data-status={context().status}
      class={cn(progressCircleClassName, local.class)}
      style={style()}
    >
      {local.children}
    </svg>
  )
}
