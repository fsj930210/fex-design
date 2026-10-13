import { inject, type InjectionKey } from 'vue'
import type { useCalendar } from './use-calendar'
export type CalendarContextValue = ReturnType<typeof useCalendar>
export const calendarContextKey: InjectionKey<CalendarContextValue> = Symbol('CalendarContext')
export function useCalendarContext(component = 'Calendar') {
  const context = inject(calendarContextKey)
  if (!context) throw new Error(component + ' must be used within CalendarRoot')
  return context
}
