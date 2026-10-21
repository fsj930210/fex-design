import type { TimeValue, DisabledTime } from '../time-picker/types'
import type { CalendarDateTime } from '../calendar/types'
import type {
  CalendarDate,
  CalendarPanel,
  CalendarQuarter,
  CalendarRange,
  CalendarValue,
  CalendarWeek,
  CalendarWeekday,
  CalendarYear,
  CalendarYearMonth,
} from '../calendar/types'

export type DatePickerPicker = 'date' | 'week' | 'month' | 'quarter' | 'year'

export interface DatePickerValueMap {
  date: CalendarDate
  week: CalendarWeek
  month: CalendarYearMonth
  quarter: CalendarQuarter
  year: CalendarYear
}

export type DatePickerValue<TPicker extends DatePickerPicker = DatePickerPicker> =
  DatePickerValueMap[TPicker]

export type DatePickerInputPart = 'start' | 'end'

export type DatePickerHeaderAction =
  | 'previous-year'
  | 'previous-month'
  | 'next-month'
  | 'next-year'
  | 'previous-panel'
  | 'next-panel'

export type DatePickerHeaderLabelPart = 'year' | 'month'

export interface DatePickerDisabledDateInfo<TValue extends CalendarValue = CalendarValue> {
  picker: DatePickerPicker
  panel: CalendarPanel
  activePart?: DatePickerInputPart | undefined
  from?: TValue | null | undefined
  value?: TValue | readonly TValue[] | null | undefined
  rangeValue?: CalendarRange<TValue> | undefined
}

export interface DatePickerConstraintOptions<TValue extends CalendarValue = CalendarValue> {
  picker: DatePickerPicker
  panel: CalendarPanel
  minDate?: CalendarDate | undefined
  maxDate?: CalendarDate | undefined
  disabledDate?:
    | ((date: CalendarDate, info: DatePickerDisabledDateInfo<TValue>) => boolean)
    | undefined
}

export interface DatePickerFormatOptions {
  picker: DatePickerPicker
  format?: string | undefined
  weekStartsOn?: CalendarWeekday | undefined
}

export type { CalendarDateTime as DatePickerDateTime } from '../calendar/types'
export interface DatePickerShowTime {
  format?: string | undefined
  use12Hours?: boolean | undefined
  step?:
    | { hour?: number | undefined; minute?: number | undefined; second?: number | undefined }
    | undefined
  defaultOpenValue?:
    | TimeValue
    | { start?: TimeValue | undefined; end?: TimeValue | undefined }
    | undefined
  disabledTime?: DisabledTime | undefined
}
export type DatePickerDisabledTime = (
  value: CalendarDateTime,
  info: { activePart: DatePickerInputPart; from: CalendarDateTime | null },
) => ReturnType<DisabledTime>
