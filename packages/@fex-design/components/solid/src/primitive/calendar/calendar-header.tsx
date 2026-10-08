import {
  addDate,
  subtractDate,
  type CalendarDate,
  type CalendarGranularity,
  type CalendarPanel,
} from '@fex-design/core/calendar'
import { splitProps, type JSX } from 'solid-js'
import { useCalendarContext } from './calendar-context'

export interface CalendarHeaderProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (context: {
    viewDate: CalendarDate
    panel: CalendarPanel
    granularity: CalendarGranularity
    previousYear: () => void
    previousMonth: () => void
    nextMonth: () => void
    nextYear: () => void
    setPanel: (panel: CalendarPanel) => void
  }) => JSX.Element
}

export function CalendarHeader(props: CalendarHeaderProps) {
  const [local, rest] = splitProps(props, ['children'])
  const context = useCalendarContext('CalendarHeader')

  return (
    <div {...rest} data-slot="calendar-header">
      {local.children({
        viewDate: context.viewDate(),
        panel: context.panel(),
        granularity: context.granularity(),
        previousYear: () => context.setViewDate(subtractDate(context.viewDate(), { years: 1 })),
        previousMonth: () => context.setViewDate(subtractDate(context.viewDate(), { months: 1 })),
        nextMonth: () => context.setViewDate(addDate(context.viewDate(), { months: 1 })),
        nextYear: () => context.setViewDate(addDate(context.viewDate(), { years: 1 })),
        setPanel: context.setPanel,
      })}
    </div>
  )
}
