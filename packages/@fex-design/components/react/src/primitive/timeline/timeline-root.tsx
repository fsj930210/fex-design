import { timelineClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import type { TimelineAlign, TimelineOrientation } from './timeline-types'

export interface TimelineProps extends Omit<ComponentProps<'ol'>, 'children'> {
  orientation?: TimelineOrientation
  align?: TimelineAlign
  reverse?: boolean
  children?: ComponentProps<'ol'>['children']
}

export function Timeline({
  orientation = 'vertical',
  align = 'end',
  reverse = false,
  className,
  children,
  ...props
}: TimelineProps) {
  return (
    <ol
      {...props}
      data-slot="timeline"
      data-orientation={orientation}
      data-align={align}
      data-reverse={reverse || undefined}
      className={cn(timelineClassName({ orientation, align, reverse }), className)}
    >
      {children}
    </ol>
  )
}

export { Timeline as TimelineRoot, type TimelineProps as TimelineRootProps }
