import { timelineIndicatorClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function TimelineIndicator({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden="true"
      {...props}
      data-slot="timeline-indicator"
      className={cn(timelineIndicatorClassName, className)}
    />
  )
}
