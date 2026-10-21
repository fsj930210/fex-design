import type { CalendarValue } from '@fex-design/core/calendar'
import type {
  DatePickerController,
  DatePickerState,
} from '@fex-design/core/date-picker/create-date-picker'
import type {
  RangePickerController,
  RangePickerState,
} from '@fex-design/core/date-picker/create-range-picker'
export type { DatePickerSelectionValue } from '@fex-design/core/date-picker/create-date-picker'
import { inject, type ComputedRef, type InjectionKey } from 'vue'

type ReactiveState<T, K extends keyof T> = Omit<T, K> & { [P in K]: ComputedRef<T[P]> }

export type DatePickerContextValue<TValue extends CalendarValue = CalendarValue> = ReactiveState<
  DatePickerState<TValue>,
  | 'timeValue'
  | 'open'
  | 'panel'
  | 'viewDate'
  | 'hoverValue'
  | 'previewValue'
  | 'value'
  | 'calendarValue'
  | 'calendarValues'
  | 'inputValue'
  | 'displayValue'
  | 'canConfirm'
  | 'committedValue'
  | 'pendingValue'
> &
  DatePickerController<TValue> & { controller: DatePickerController<TValue> }

export type RangePickerContextValue<TValue extends CalendarValue = CalendarValue> = ReactiveState<
  RangePickerState<TValue>,
  | 'timeValue'
  | 'open'
  | 'panel'
  | 'viewDate'
  | 'rangeValue'
  | 'activePart'
  | 'hoverValue'
  | 'previewValue'
  | 'startText'
  | 'endText'
  | 'displayRange'
  | 'canConfirm'
  | 'committedValue'
  | 'pendingValue'
> &
  RangePickerController<TValue> & { controller: RangePickerController<TValue> }

export const datePickerContextKey: InjectionKey<DatePickerContextValue> =
  Symbol('DatePickerContext')
export const rangePickerContextKey: InjectionKey<RangePickerContextValue> =
  Symbol('RangePickerContext')

export function useDatePickerContext(component: string): DatePickerContextValue {
  const context = inject(datePickerContextKey)
  if (!context) throw new Error(`${component} must be used within DatePickerRoot`)
  return context
}

export function useRangePickerContext(component: string): RangePickerContextValue {
  const context = inject(rangePickerContextKey)
  if (!context) throw new Error(`${component} must be used within RangePickerRoot`)
  return context
}
