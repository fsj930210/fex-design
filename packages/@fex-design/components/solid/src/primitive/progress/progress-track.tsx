import { progressLineClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useProgressContext } from './progress-context'

export type ProgressTrackProps = JSX.HTMLAttributes<HTMLDivElement>

export function ProgressTrack(props: ProgressTrackProps) {
  const [local, others] = splitProps(props, ['class', 'style', 'children'])
  const context = useProgressContext('ProgressTrack')
  const style = () => typeof local.style === 'string'
    ? `height: ${context().thickness}px; ${local.style}`
    : { height: `${context().thickness}px`, ...local.style }
  return (
    <div {...others} data-slot="progress-track" data-status={context().status}
      class={cn(progressLineClassName, local.class)} style={style()}>
      {local.children}
    </div>
  )
}
