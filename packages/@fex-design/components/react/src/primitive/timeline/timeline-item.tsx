import { timelineItemClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import type { TimelinePlacement, TimelineStatus } from './timeline-types'

export interface TimelineItemProps extends ComponentProps<'li'> {
  status?: TimelineStatus
  connectorStatus?: TimelineStatus
  placement?: TimelinePlacement
}

export function TimelineItem({
  status = 'default',
  connectorStatus,
  placement,
  className,
  ...props
}: TimelineItemProps) {
  return (
    <li
      {...props}
      data-slot="timeline-item"
      data-status={status}
      data-connector-status={connectorStatus ?? status}
      data-placement={placement}
      aria-current={status === 'current' ? 'step' : undefined}
      className={cn(timelineItemClassName, className)}
    />
  )
}
