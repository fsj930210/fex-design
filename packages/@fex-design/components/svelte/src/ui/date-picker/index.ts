export { default as DatePicker } from './date-picker.svelte'
export { default as RangePicker } from './range-picker.svelte'
export type { DatePickerProps } from './date-picker.types'
export type { RangePickerProps } from './range-picker.types'

export type {
  DatePickerInputProps,
  DatePickerEndpointProps,
  DatePickerCalendarProps,
  DatePickerPopoverProps,
  DatePickerClassNames,
  DatePickerStyles,
} from '@fex-design/svelte/primitive/date-picker'
export type { DatePickerStyle } from '@fex-design/svelte/primitive/date-picker'

export type {
  DatePickerDateTime,
  DatePickerShowTime,
  DatePickerDisabledTime,
} from '@fex-design/core/date-picker/types'
export { createCalendarDateTime as createDatePickerDateTime } from '@fex-design/core/calendar/temporal'
