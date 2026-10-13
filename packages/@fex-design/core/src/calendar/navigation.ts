import { addDate } from '../date/utils'
import type { CalendarDate, CalendarGranularity, CalendarPanel } from './types'

export type CalendarNavigationAction = 'previous-year' | 'previous-month' | 'next-month' | 'next-year' | 'previous-panel' | 'next-panel' | 'today'

export function getCalendarNavigationDate(date: CalendarDate, panel: CalendarPanel, action: CalendarNavigationAction, today: CalendarDate): CalendarDate {
  if (action === 'today') return today
  const direction = action.startsWith('previous') ? -1 : 1
  if (action.endsWith('month')) return addDate(date, { months: direction })
  if (action.endsWith('year')) return addDate(date, { years: direction })
  if (panel === 'date') return addDate(date, { months: direction })
  return addDate(date, { years: direction * (panel === 'year' || panel === 'decade' ? 10 : 1) })
}

export function getCalendarDefaultPanel(granularity: CalendarGranularity): CalendarPanel {
  return granularity === 'week' ? 'date' : granularity
}

export function getCalendarNextPanel(panel: CalendarPanel, granularity: CalendarGranularity): CalendarPanel | null {
  if (granularity === 'year' && (panel === 'year' || panel === 'decade')) return null
  if (panel === getCalendarDefaultPanel(granularity)) return null
  if (panel === 'decade') return 'year'
  if (panel === 'year') return granularity === 'quarter' ? 'quarter' : 'month'
  if (panel === 'month') return 'date'
  if (panel === 'quarter') return 'date'
  return null
}
