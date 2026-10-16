import {
  compareCalendarValue,
  getCalendarValueDate,
  getCalendarSelectionValue,
  getCalendarValueKey,
  isSameCalendarValue,
} from '../calendar/value'
import { format } from '../date/utils'
import type {
  CalendarDate,
  CalendarQuarter,
  CalendarValue,
  CalendarWeekday,
  CalendarYear,
  CalendarYearMonth,
} from '../calendar/types'
import type { DatePickerFormatOptions, DatePickerPicker, DatePickerValue } from './types'

export { compareCalendarValue as compareDatePickerValue }
export { getCalendarValueDate as getDatePickerValueDate }
export { getCalendarValueKey as getDatePickerValueKey }
export { isSameCalendarValue as isSameDatePickerValue }

export function getDefaultDatePickerFormat(picker: DatePickerPicker): string {
  if (picker === 'month') return 'YYYY-MM'
  if (picker === 'year') return 'YYYY'
  if (picker === 'quarter') return 'YYYY-[Q]Q'
  if (picker === 'week') return 'YYYY-W'
  return 'YYYY-MM-DD'
}

export function normalizeDatePickerValue<TPicker extends DatePickerPicker>(
  date: CalendarDate,
  picker: TPicker,
  weekStartsOn: CalendarWeekday = 0,
): DatePickerValue<TPicker> {
  return getCalendarSelectionValue(date, picker, weekStartsOn) as DatePickerValue<TPicker>
}

export function formatDatePickerValue(
  value: CalendarValue | null | undefined,
  options: DatePickerFormatOptions,
): string {
  if (!value) return ''
  if (options.picker === 'week') {
    const date = getCalendarValueDate(value) as CalendarDate & {
      yearOfWeek?: number
      weekOfYear?: number
    }
    const year = date.yearOfWeek ?? date.year
    const week = date.weekOfYear
    return week ? `${year}-${week}周` : format(date, options.format ?? 'YYYY-MM-DD')
  }
  if (options.picker === 'quarter') {
    const quarter = value as CalendarQuarter
    const pattern = options.format ?? getDefaultDatePickerFormat(options.picker)
    return pattern.replace('YYYY', String(quarter.year)).replace('[Q]Q', `Q${quarter.quarter}`)
  }
  if (options.picker === 'year') {
    const year = value as CalendarYear
    return String(year.year)
  }
  return format(
    getCalendarValueDate(value),
    options.format ?? getDefaultDatePickerFormat(options.picker),
  )
}

export function datePickerValueToPlainDate(value: CalendarValue): CalendarDate {
  return getCalendarValueDate(value)
}

export function datePickerValueToPlainYearMonth(value: CalendarYearMonth): CalendarYearMonth {
  return value
}
