import {
  getCalendarWeekHeaderItems,
  calendarDefaultWeekLabels,
  type CalendarWeekHeaderItem,
} from '@fex-design/core/calendar'
import { calendarWeekHeaderClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import { useCalendarContext } from './calendar-context'

export type CalendarWeekHeaderProps = Omit<ComponentProps<'div'>, 'children'> & {
  labels?: readonly string[]
  children?: (item: CalendarWeekHeaderItem) => ReactNode
}

export function CalendarWeekHeader({
  labels = calendarDefaultWeekLabels,
  children,
  className,
  ...props
}: CalendarWeekHeaderProps) {
  const context = useCalendarContext('CalendarWeekHeader')
  const items = getCalendarWeekHeaderItems(labels, context.state.weekStartsOn)
  return (
    <div
      {...props}
      data-slot="calendar-week-header"
      className={cn(calendarWeekHeaderClassName, className)}
    >
      {items.map((item) => (
        <div key={item.index} data-slot="calendar-week-head">
          {children ? children(item) : item.label}
        </div>
      ))}
    </div>
  )
}
