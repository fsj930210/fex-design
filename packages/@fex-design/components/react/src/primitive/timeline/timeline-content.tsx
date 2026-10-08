import { timelineContentClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function TimelineContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      data-slot="timeline-content"
      className={cn(timelineContentClassName, className)}
    />
  )
}
