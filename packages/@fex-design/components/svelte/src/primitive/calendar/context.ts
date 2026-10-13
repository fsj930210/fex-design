import { getContext } from 'svelte'
import type { CalendarController } from '@fex-design/core/calendar'
export interface CalendarContextValue { controller: CalendarController; getState: CalendarController['getState']; getGrid: CalendarController['getGrid'] }
export const calendarContextKey = Symbol('CalendarContext')
export function useCalendarContext(component = 'Calendar'): CalendarContextValue {
  const context = getContext<CalendarContextValue | undefined>(calendarContextKey)
  if (!context) throw new Error(component + ' must be used within CalendarRoot')
  return context
}
