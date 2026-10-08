import {
  addDate,
  type CalendarDate,
  type CalendarGranularity,
  type CalendarPanel,
} from '@fex-design/core/calendar'
import type { ComponentProps, ReactNode } from 'react'
import { useCalendarContext } from './calendar-context'

export interface CalendarHeaderProps extends Omit<ComponentProps<'div'>, 'children'> {
  children: (context: {
    viewDate: CalendarDate
    panel: CalendarPanel
    granularity: CalendarGranularity
    previousYear: () => void
    previousMonth: () => void
    nextMonth: () => void
    nextYear: () => void
    previous: () => void
    next: () => void
    setPanel: (panel: CalendarPanel) => void
  }) => ReactNode
}

export function CalendarHeader({ children, className, ...props }: CalendarHeaderProps) {
  const context = useCalendarContext('CalendarHeader')

  function shiftByPanel(offset: number) {
    if (context.panel === 'date') {
      context.setViewDate(addDate(context.viewDate, { months: offset }))
      return
    }
    if (context.panel === 'month' || context.panel === 'quarter') {
      context.setViewDate(addDate(context.viewDate, { years: offset }))
      return
    }
    context.setViewDate(addDate(context.viewDate, { years: offset * 10 }))
  }

  function shiftMonth(offset: number) {
    context.setViewDate(addDate(context.viewDate, { months: offset }))
  }

  function shiftYear(offset: number) {
    context.setViewDate(addDate(context.viewDate, { years: offset }))
  }

  return (
    <div {...props} data-slot="calendar-header" className={className}>
      {children({
        viewDate: context.viewDate,
        panel: context.panel,
        granularity: context.granularity,
        previousYear: () => shiftYear(-1),
        previousMonth: () => shiftMonth(-1),
        nextMonth: () => shiftMonth(1),
        nextYear: () => shiftYear(1),
        previous: () => shiftByPanel(-1),
        next: () => shiftByPanel(1),
        setPanel: context.setPanel,
      })}
    </div>
  )
}
