import { Temporal } from '../calendar/temporal'
import { getCalendarValueDate, isCalendarDateTime } from '../calendar/value'
import type { CalendarDate, CalendarDateTime, CalendarValue } from '../calendar/types'
import { analyzeTimeFormat, tokenizeDateFormat } from '../date/utils'
import { normalizeTimeValue } from '../time-picker/value'
import { resolveDisabledTime } from '../time-picker/options'
import type { TimeValue } from '../time-picker/types'
import type { PickerOptions } from './options'
import type { DatePickerInputPart, DatePickerShowTime } from './types'

export function hasDatePickerTime(
  options: PickerOptions & { multiple?: boolean | undefined },
): boolean {
  return Boolean(
    options.showTime && !options.multiple && (!options.picker || options.picker === 'date'),
  )
}

/** Derive only time tokens from the full display format; date literals remain untouched. */
export function resolveDatePickerTime(
  options: PickerOptions,
): DatePickerShowTime & { format: string; use12Hours: boolean } {
  const raw = typeof options.showTime === 'object' ? options.showTime : {}
  const parts = options.format ? tokenizeDateFormat(options.format) : []
  const timeToken = (token: string) =>
    ['H', 'HH', 'h', 'hh', 'm', 'mm', 's', 'ss', 'a', 'A'].includes(token)
  const indices = parts.flatMap((part, index) =>
    part.type === 'token' && timeToken(part.token) ? [index] : [],
  )
  const inferred = indices.length
    ? parts
        .slice(indices[0], indices[indices.length - 1]! + 1)
        .map((part) => (part.type === 'token' ? part.token : '[' + part.value + ']'))
        .join('')
    : undefined
  const pattern = raw.format ?? inferred
  const use12Hours =
    raw.use12Hours ??
    Boolean(
      pattern &&
      tokenizeDateFormat(pattern).some(
        (part) => part.type === 'token' && ['h', 'hh', 'a', 'A'].includes(part.token),
      ),
    )
  return {
    format: pattern ?? (use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'),
    use12Hours,
    step: raw.step,
    defaultOpenValue: raw.defaultOpenValue,
    disabledTime: raw.disabledTime,
  }
}

export function getDatePickerTimeColumns(options: { format: string; use12Hours: boolean }) {
  return analyzeTimeFormat(options.format, options.use12Hours).columns
}

export function getDatePickerTimeValue(value: CalendarValue | null | undefined): TimeValue | null {
  return value && isCalendarDateTime(value)
    ? {
        hour: value.hour,
        minute: value.minute,
        second: value.second,
        millisecond: value.millisecond,
      }
    : null
}

export function getDatePickerDefaultTime(
  options: PickerOptions,
  part: DatePickerInputPart,
): TimeValue {
  const value = resolveDatePickerTime(options).defaultOpenValue
  return value
    ? 'hour' in value
      ? value
      : (value[part] ?? { hour: 0, minute: 0, second: 0 })
    : { hour: 0, minute: 0, second: 0 }
}

export function mergeDatePickerTime(date: CalendarDate, time: TimeValue): CalendarDateTime {
  const normalized = normalizeTimeValue(time)
  return Temporal.PlainDateTime.from({
    year: date.year,
    month: date.month,
    day: date.day,
    hour: normalized.hour,
    minute: normalized.minute,
    second: normalized.second,
    millisecond: normalized.millisecond ?? 0,
  })
}

export function mergeDatePickerDate(
  value: CalendarValue,
  previous: CalendarValue | null | undefined,
  options: PickerOptions,
  part: DatePickerInputPart = 'start',
): CalendarDateTime {
  return mergeDatePickerTime(
    getCalendarValueDate(value),
    getDatePickerTimeValue(value) ??
      getDatePickerTimeValue(previous) ??
      getDatePickerDefaultTime(options, part),
  )
}

export function isDatePickerTimeDisabled(
  value: CalendarValue,
  options: PickerOptions,
  activePart: DatePickerInputPart = 'start',
  from: CalendarValue | null = null,
): boolean {
  if (!hasDatePickerTime(options) || !isCalendarDateTime(value)) return false
  const time = resolveDatePickerTime(options)
  const result = options.disabledTime?.(value, {
    activePart,
    from: from && isCalendarDateTime(from) ? from : null,
  })
  const resolved = resolveDisabledTime(result ? () => result : time.disabledTime, value)
  return (
    resolved.hours.includes(value.hour) ||
    resolved.minutes.includes(value.minute) ||
    resolved.seconds.includes(value.second) ||
    resolved.milliseconds.includes(value.millisecond)
  )
}
