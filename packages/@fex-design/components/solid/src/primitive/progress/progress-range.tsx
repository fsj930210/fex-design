import { progressLineRangeClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { createMemo, splitProps, type JSX } from 'solid-js'
import { useProgressContext } from './progress-context'

export type ProgressRangeProps = JSX.HTMLAttributes<HTMLDivElement> & {
  value?: number
  offset?: number
}

export function ProgressRange(props: ProgressRangeProps) {
  const [local, others] = splitProps(props, ['value', 'offset', 'class', 'style'])
  const context = useProgressContext('ProgressRange')
  const percentage = createMemo(() => local.value !== undefined
    ? Math.min(1, Math.max(0, (local.value - context().min) / (context().max - context().min)))
    : context().percentage)
  const style = () => {
    const width = percentage() !== null ? `${percentage()! * 100}%` : undefined
    const left = local.offset !== undefined ? `${local.offset}%` : undefined
    return typeof local.style === 'string'
      ? `${width ? `width: ${width};` : ''} ${left ? `left: ${left};` : ''} ${local.style}`
      : { width, left, ...local.style }
  }
  return (
    <div {...others} data-slot="progress-range" data-status={context().status}
      class={cn(progressLineRangeClassName, local.offset !== undefined && 'absolute top-0', local.class)} style={style()} />
  )
}
