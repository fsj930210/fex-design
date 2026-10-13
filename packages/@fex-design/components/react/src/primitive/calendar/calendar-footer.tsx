import { calendarFooterClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export type CalendarFooterProps = ComponentProps<'div'>
export function CalendarFooter({ className, ...props }: CalendarFooterProps) {
  return (
    <div
      {...props}
      data-slot="calendar-footer"
      className={cn(calendarFooterClassName, className)}
    />
  )
}
