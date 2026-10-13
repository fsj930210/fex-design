import { splitProps, type JSX } from 'solid-js'
import type { CalendarOptions, CalendarValue } from '@fex-design/core/calendar'
import { calendarRootClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { CalendarContext } from './calendar-context'
import { createCalendar } from './create-calendar'
export type CalendarRootProps<TValue extends CalendarValue = CalendarValue> = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> & CalendarOptions<TValue>
export function CalendarRoot<TValue extends CalendarValue = CalendarValue>(props: CalendarRootProps<TValue>) {
  const [options, rest] = splitProps(props, ['value', 'values', 'range', 'defaultValue', 'viewDate', 'defaultViewDate', 'panel', 'defaultPanel', 'granularity', 'weekStartsOn', 'locale', 'showWeek', 'fullscreen', 'today', 'min', 'max', 'disabledDate', 'onChange', 'onSelect', 'onCellSelect', 'onCellHover', 'onViewDateChange', 'onPanelChange'])
  const [local, attrs] = splitProps(rest, ['children', 'class', 'onMouseLeave'])
  const calendar = createCalendar(() => options)
  return <CalendarContext.Provider value={calendar}><div {...attrs} data-slot="calendar-root" data-panel={calendar.state().panel} data-granularity={calendar.state().granularity} class={cn(calendarRootClassName, local.class)} onMouseLeave={event => { callCalendarHandler(local.onMouseLeave, event); if (!event.defaultPrevented) calendar.controller.clearHoveredRow() }}>{local.children}</div></CalendarContext.Provider>
}
import { callCalendarHandler } from './events'
