import { createContext, use } from 'react'
import type { CalendarController } from '@fex-design/core/calendar'
export type CalendarContextValue = {
  state: ReturnType<CalendarController['getState']>
  grid: ReturnType<CalendarController['getGrid']>
  controller: CalendarController
}
export const CalendarContext = createContext<CalendarContextValue | null>(null)
export function useCalendarContext(component = 'Calendar') {
  const context = use(CalendarContext)
  if (!context) throw new Error(component + ' must be used within CalendarRoot')
  return context
}
