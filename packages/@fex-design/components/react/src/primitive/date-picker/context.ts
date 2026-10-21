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
import { createContext, use } from 'react'

export type DatePickerContextValue<TValue extends CalendarValue = CalendarValue> =
  DatePickerState<TValue> &
    DatePickerController<TValue> & { controller: DatePickerController<TValue> }

export type RangePickerContextValue<TValue extends CalendarValue = CalendarValue> =
  RangePickerState<TValue> &
    RangePickerController<TValue> & { controller: RangePickerController<TValue> }

export const DatePickerContext = createContext<DatePickerContextValue | null>(null)
export const RangePickerContext = createContext<RangePickerContextValue | null>(null)

export function useDatePickerContext(component: string): DatePickerContextValue {
  const context = use(DatePickerContext)
  if (!context) throw new Error(`${component} must be used within DatePickerRoot`)
  return context
}

export function useRangePickerContext(component: string): RangePickerContextValue {
  const context = use(RangePickerContext)
  if (!context) throw new Error(`${component} must be used within RangePickerRoot`)
  return context
}
