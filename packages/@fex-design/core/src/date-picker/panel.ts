import { addDate, subtractDate } from '../date/utils'
import type { CalendarCell, CalendarDate, CalendarGranularity, CalendarLocale, CalendarPanel } from '../calendar/types'
import { calendarDefaultLocale } from '../calendar/ui'
import type { DatePickerHeaderAction, DatePickerHeaderLabelPart, DatePickerPicker } from './types'

export function getDefaultPanelByPicker(picker: DatePickerPicker): CalendarPanel {
  if (picker === 'month') return 'month'
  if (picker === 'quarter') return 'quarter'
  if (picker === 'year') return 'decade'
  return 'date'
}

export function getGranularityByPicker(picker: DatePickerPicker): CalendarGranularity {
  return picker
}

export function getNextPanelByHeaderLabel(part: DatePickerHeaderLabelPart): CalendarPanel {
  return part === 'year' ? 'decade' : 'month'
}

export function getDatePickerHeaderLabel(viewDate: CalendarDate, panel: CalendarPanel, part: DatePickerHeaderLabelPart, locale?: Partial<CalendarLocale>): string {
  if (part === 'month') return locale?.months?.[viewDate.month - 1] ?? `${viewDate.month}月`
  const firstYear = Math.floor(viewDate.year / 10) * 10
  const year = panel === 'decade' ? `${firstYear}-${firstYear + 9}` : String(viewDate.year)
  return year + (locale?.yearSuffix ?? calendarDefaultLocale.yearSuffix ?? '')
}

export function getDatePickerHeaderActionLabel(action: DatePickerHeaderAction, locale?: Partial<CalendarLocale>): string {
  const key = action.startsWith('previous') ? 'previous' : 'next'
  return locale?.[key] ?? calendarDefaultLocale[key]
}

export function getDatePickerCellLabel(cell: CalendarCell, locale?: Partial<CalendarLocale>): string {
  return cell.panel === 'month' ? locale?.months?.[cell.date.month - 1] ?? cell.label : cell.label
}

export function getDatePickerHeaderActions(panel: CalendarPanel): { previous: DatePickerHeaderAction; next: DatePickerHeaderAction } {
  return panel === 'date' ? { previous: 'previous-year', next: 'next-year' }
    : { previous: 'previous-panel', next: 'next-panel' }
}

export function getDatePickerHeaderLabelParts(
  picker: DatePickerPicker,
  panel: CalendarPanel,
): DatePickerHeaderLabelPart[] {
  if (picker === 'year') return ['year']
  if (
    picker === 'quarter' ||
    panel === 'month' ||
    panel === 'quarter' ||
    panel === 'year' ||
    panel === 'decade'
  )
    return ['year']
  return ['year', 'month']
}

export function getNextViewDateByHeaderAction(
  viewDate: CalendarDate,
  action: DatePickerHeaderAction,
  panel: CalendarPanel,
): CalendarDate {
  if (action === 'previous-year') return subtractDate(viewDate, { years: 1 })
  if (action === 'next-year') return addDate(viewDate, { years: 1 })
  if (action === 'previous-month') return subtractDate(viewDate, { months: 1 })
  if (action === 'next-month') return addDate(viewDate, { months: 1 })
  if (panel === 'date') {
    return action === 'previous-panel'
      ? subtractDate(viewDate, { months: 1 })
      : addDate(viewDate, { months: 1 })
  }
  return action === 'previous-panel'
    ? subtractDate(viewDate, { years: panel === 'decade' || panel === 'year' ? 10 : 1 })
    : addDate(viewDate, { years: panel === 'decade' || panel === 'year' ? 10 : 1 })
}

export function getRangePanelViewDates(
  viewDate: CalendarDate,
  panel: CalendarPanel,
): [CalendarDate, CalendarDate] {
  if (panel === 'date') return [viewDate, addDate(viewDate, { months: 1 })]
  if (panel === 'month' || panel === 'quarter') return [viewDate, addDate(viewDate, { years: 1 })]
  if (panel === 'year') return [viewDate, addDate(viewDate, { years: 12 })]
  return [viewDate, addDate(viewDate, { years: 10 })]
}

export function getVisibleRangePanelViewDates(viewDate: CalendarDate, panel: CalendarPanel, panelCount?: 1 | 2) {
  const dates = getRangePanelViewDates(viewDate, panel)
  return panelCount === 1 ? dates.slice(0, 1) : dates
}
