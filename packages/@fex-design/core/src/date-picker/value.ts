import {
  compareCalendarValue,
  isCalendarDateTime,
  getCalendarValueDate,
  getCalendarSelectionValue,
  getCalendarValueKey,
} from '../calendar/value'
import { format } from '../date/utils'
import { Temporal } from '../calendar/temporal'
import type {
  CalendarDate,
  CalendarQuarter,
  CalendarValue,
  CalendarWeekday,
  CalendarYear,
  CalendarYearMonth,
} from '../calendar/types'
import type { DatePickerFormatOptions, DatePickerPicker, DatePickerValue } from './types'

export function compareDatePickerValue(left: CalendarValue, right: CalendarValue): number {
  const date = compareCalendarValue(left, right)
  if (date || !isCalendarDateTime(left) || !isCalendarDateTime(right)) return date
  return Temporal.PlainDateTime.compare(left, right)
}
export { getCalendarValueDate as getDatePickerValueDate }
export function getDatePickerValueKey(value: CalendarValue): string {
  return isCalendarDateTime(value) ? 'datetime:' + value.toString() : getCalendarValueKey(value)
}
export function isSameDatePickerValue(
  left: CalendarValue | null | undefined,
  right: CalendarValue | null | undefined,
): boolean {
  return Boolean(left && right && getDatePickerValueKey(left) === getDatePickerValueKey(right))
}

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
    isCalendarDateTime(value) ? value : getCalendarValueDate(value),
    options.format ?? getDefaultDatePickerFormat(options.picker),
  )
}

export function datePickerValueToPlainDate(value: CalendarValue): CalendarDate {
  return getCalendarValueDate(value)
}

export function datePickerValueToPlainYearMonth(value: CalendarYearMonth): CalendarYearMonth {
  return value
}
