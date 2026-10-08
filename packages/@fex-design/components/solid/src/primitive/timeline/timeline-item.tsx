import { timelineItemClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import type { TimelinePlacement, TimelineStatus } from './timeline-types'

export interface TimelineItemProps extends ParentProps<JSX.LiHTMLAttributes<HTMLLIElement>> {
  status?: TimelineStatus
  connectorStatus?: TimelineStatus
  placement?: TimelinePlacement
}

export function TimelineItem(props: TimelineItemProps) {
  const [local, rest] = splitProps(props, [
    'status',
    'connectorStatus',
    'placement',
    'class',
    'children',
  ])
  const status = () => local.status ?? 'default'

  return (
    <li
      {...rest}
      data-slot="timeline-item"
      data-status={status()}
      data-connector-status={local.connectorStatus ?? status()}
      data-placement={local.placement}
      aria-current={status() === 'current' ? 'step' : undefined}
      class={cn(timelineItemClassName, local.class)}
    >
      {local.children}
    </li>
  )
}
