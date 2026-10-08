import { timelineContentClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export function TimelineContent(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} data-slot="timeline-content" class={cn(timelineContentClassName, local.class)}>
      {local.children}
    </div>
  )
}
