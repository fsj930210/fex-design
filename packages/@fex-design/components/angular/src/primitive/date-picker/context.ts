import type { CalendarValue } from '@fex-design/core/calendar'
import type { DatePickerController, DatePickerState } from '@fex-design/core/date-picker/create-date-picker'
import type { RangePickerController, RangePickerState } from '@fex-design/core/date-picker/create-range-picker'
export type { DatePickerSelectionValue } from '@fex-design/core/date-picker/create-date-picker'


export type DatePickerContextValue<TValue extends CalendarValue = CalendarValue> = DatePickerState<TValue> & DatePickerController<TValue> & { controller: DatePickerController<TValue> }

export type RangePickerContextValue<TValue extends CalendarValue = CalendarValue> = RangePickerState<TValue> & RangePickerController<TValue> & { controller: RangePickerController<TValue> }
