import { timelineOppositeClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export function TimelineOpposite(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} data-slot="timeline-opposite" class={cn(timelineOppositeClassName, local.class)}>
      {local.children}
    </div>
  )
}
