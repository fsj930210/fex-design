import type { CalendarOptions, CalendarValue } from '@fex-design/core/calendar'
import { calendarRootClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { CalendarContext } from './calendar-context'
import { useCalendar } from './use-calendar'
export type CalendarRootProps<TValue extends CalendarValue = CalendarValue> = Omit<
  ComponentProps<'div'>,
  'defaultValue' | 'onChange' | 'onSelect'
> &
  CalendarOptions<TValue>
export function CalendarRoot<TValue extends CalendarValue = CalendarValue>({
  value,
  values,
  range,
  defaultValue,
  viewDate,
  defaultViewDate,
  panel,
  defaultPanel,
  granularity,
  weekStartsOn,
  locale,
  showWeek,
  fullscreen,
  today,
  min,
  max,
  disabledDate,
  onChange,
  onSelect,
  onCellSelect,
  onCellHover,
  onViewDateChange,
  onPanelChange,
  children,
  className,
  onMouseLeave,
  ...props
}: CalendarRootProps<TValue>) {
  const calendar = useCalendar({
    value,
    values,
    range,
    defaultValue,
    viewDate,
    defaultViewDate,
    panel,
    defaultPanel,
    granularity,
    weekStartsOn,
    locale,
    showWeek,
    fullscreen,
    today,
    min,
    max,
    disabledDate,
    onChange,
    onSelect,
    onCellSelect,
    onCellHover,
    onViewDateChange,
    onPanelChange,
  })
  return (
    <CalendarContext value={calendar}>
      <div
        {...props}
        data-slot="calendar-root"
        data-panel={calendar.state.panel}
        data-granularity={calendar.state.granularity}
        className={cn(calendarRootClassName, className)}
        onMouseLeave={(event) => {
          onMouseLeave?.(event)
          if (!event.defaultPrevented) calendar.controller.clearHoveredRow()
        }}
      >
        {children}
      </div>
    </CalendarContext>
  )
}
