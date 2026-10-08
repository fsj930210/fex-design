import type { ComponentProps } from 'react'
import { useCalendarContext } from './calendar-context'

export interface CalendarWeekHeaderProps extends ComponentProps<'div'> {
  labels?: readonly string[]
}

export function CalendarWeekHeader({
  labels = ['日', '一', '二', '三', '四', '五', '六'],
  className,
  ...props
}: CalendarWeekHeaderProps) {
  const context = useCalendarContext('CalendarWeekHeader')
  const orderedLabels = labels.map((_, index) => labels[(index + context.weekStartsOn) % 7] ?? '')

  return (
    <div {...props} data-slot="calendar-week-header" className={className}>
      {orderedLabels.map((label) => (
        <div key={label} data-slot="calendar-week-head">
          {label}
        </div>
      ))}
    </div>
  )
}
