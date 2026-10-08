import { timelineOppositeClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function TimelineOpposite({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      data-slot="timeline-opposite"
      className={cn(timelineOppositeClassName, className)}
    />
  )
}
