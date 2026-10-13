import { createContext, useContext } from 'solid-js'
import type { createCalendar } from './create-calendar'
export type CalendarContextValue = ReturnType<typeof createCalendar>
export const CalendarContext = createContext<CalendarContextValue>()
export function useCalendarContext(component = 'Calendar') {
  const context = useContext(CalendarContext)
  if (!context) throw new Error(component + ' must be used within CalendarRoot')
  return context
}
