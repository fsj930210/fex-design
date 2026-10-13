import { calendarRowClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { useCalendarContext } from './calendar-context'
export type CalendarRowProps = ComponentProps<'div'>
export function CalendarRow({ className, children, ...props }: CalendarRowProps) {
  const context = useCalendarContext('CalendarRow')
  return (
    <div
      {...props}
      role="row"
      data-panel={context.state.panel}
      data-slot="calendar-row"
      className={cn(calendarRowClassName, className)}
    >
      {children}
    </div>
  )
}
