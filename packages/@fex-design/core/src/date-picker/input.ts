import type { CalendarRange, CalendarValue } from '../calendar/types'
import { formatDatePickerValue } from './value'
import type { DatePickerFormatOptions, DatePickerInputPart } from './types'
import { getCalendarValueKey } from '../calendar/value'

export function getDatePickerDisplayText(
  value: CalendarValue | null | undefined,
  options: DatePickerFormatOptions,
): string {
  return formatDatePickerValue(value, options)
}

export function getRangePickerDisplayTexts(
  value: CalendarRange | null | undefined,
  options: DatePickerFormatOptions,
): [string, string] {
  return [formatDatePickerValue(value?.start, options), formatDatePickerValue(value?.end, options)]
}

export function getDatePickerTagItems<TValue extends CalendarValue>(
  values: readonly TValue[],
  maxCount?: number,
) {
  const count =
    maxCount !== undefined && Number.isFinite(maxCount)
      ? Math.max(0, Math.trunc(maxCount))
      : values.length
  const occurrences = new Map<string, number>()
  const items = values.slice(0, count).map((value) => {
    const key = getCalendarValueKey(value)
    const occurrence = occurrences.get(key) ?? 0
    occurrences.set(key, occurrence + 1)
    return { value, key: occurrence ? `${key}:${occurrence}` : key }
  })
  return { items, overflowCount: values.length - items.length }
}

/** Selection display and placeholder are owned by the picker binding. */
export function getDatePickerInputAttributes<TAttributes extends object>(attributes?: TAttributes) {
  if (attributes === undefined) return undefined
  const result = { ...attributes }
  for (const name of ['value', 'defaultValue', 'placeholder', 'readOnly', 'readonly'])
    Reflect.deleteProperty(result, name)
  return result
}

/** Synchronize a core endpoint focus request with the default trigger DOM. */
export function focusDatePickerInput(element: HTMLElement | null, part: DatePickerInputPart) {
  const input = element?.querySelector<HTMLInputElement>(`[data-range-part="${part}"] input`)
  if (input && input.ownerDocument.activeElement !== input) input.focus({ preventScroll: true })
}
