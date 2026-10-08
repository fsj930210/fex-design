import { timelineIndicatorClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export function TimelineIndicator(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} data-slot="timeline-indicator" class={cn(timelineIndicatorClassName, local.class)}>
      {local.children}
    </div>
  )
}
