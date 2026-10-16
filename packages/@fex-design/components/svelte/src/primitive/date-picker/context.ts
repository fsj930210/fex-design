import type { CalendarValue } from '@fex-design/core/calendar'
import type { DatePickerController, DatePickerState } from '@fex-design/core/date-picker/create-date-picker'
import type { RangePickerController, RangePickerState } from '@fex-design/core/date-picker/create-range-picker'
export type { DatePickerSelectionValue } from '@fex-design/core/date-picker/create-date-picker'
import { getContext } from 'svelte'

type ReactiveState<T, K extends keyof T> = Omit<T, K> & { [P in K as `get${Capitalize<string & P>}`]: () => T[P] }

export type DatePickerContextValue<TValue extends CalendarValue = CalendarValue> = ReactiveState<DatePickerState<TValue>, 'open' | 'panel' | 'viewDate' | 'hoverValue' | 'previewValue' | 'value' | 'calendarValue' | 'calendarValues' | 'inputValue' | 'displayValue' | 'canConfirm' | 'committedValue' | 'pendingValue'> & DatePickerController<TValue> & { controller: DatePickerController<TValue> }

export type RangePickerContextValue<TValue extends CalendarValue = CalendarValue> = ReactiveState<RangePickerState<TValue>, 'open' | 'panel' | 'viewDate' | 'rangeValue' | 'activePart' | 'hoverValue' | 'previewValue' | 'startText' | 'endText' | 'displayRange' | 'canConfirm' | 'committedValue' | 'pendingValue'> & RangePickerController<TValue> & { controller: RangePickerController<TValue> }

export const datePickerContextKey = Symbol('DatePickerContext')
export const rangePickerContextKey = Symbol('RangePickerContext')

export function useDatePickerContext(component: string): DatePickerContextValue {
  const context = getContext<DatePickerContextValue | undefined>(datePickerContextKey)
  if (!context) throw new Error(`${component} must be used within DatePickerRoot`)
  return context
}

export function useRangePickerContext(component: string): RangePickerContextValue {
  const context = getContext<RangePickerContextValue | undefined>(rangePickerContextKey)
  if (!context) throw new Error(`${component} must be used within RangePickerRoot`)
  return context
}
