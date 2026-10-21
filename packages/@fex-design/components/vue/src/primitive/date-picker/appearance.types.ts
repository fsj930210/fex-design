import type { InputHTMLAttributes, StyleValue, VNodeChild } from 'vue'
import type { CalendarCellRenderContext } from '@fex-design/core/calendar'
import type {
  DatePickerAppearance,
  DatePickerInputOptions,
  DatePickerCalendarOptions,
  DatePickerPopoverAppearance,
} from '@fex-design/core/date-picker/appearance'
import type { DatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
export type DatePickerStyle = StyleValue
export type DatePickerEndpointProps = {
  'aria-haspopup'?: never
  'aria-expanded'?: never
  'data-slot'?: never
  'data-state'?: never
  'data-range-part'?: never
  'data-active'?: never
} & Pick<
  InputHTMLAttributes,
  | 'id'
  | 'name'
  | 'form'
  | 'title'
  | 'placeholder'
  | 'autocomplete'
  | 'required'
  | 'onFocus'
  | 'onBlur'
  | 'onClick'
  | 'onKeydown'
  | 'onKeyup'
  | 'onPointerdown'
  | 'onPointerup'
> & {
    class?: string | undefined
    style?: DatePickerStyle | undefined
    [aria: `aria-${string}`]: string | number | boolean | undefined
  } & { [data: `data-${string}`]: string | number | boolean | undefined }
export type DatePickerInputProps = DatePickerEndpointProps &
  DatePickerInputOptions<DatePickerStyle, VNodeChild>
export type DatePickerCalendarProps = DatePickerCalendarOptions<
  DatePickerStyle,
  (context: CalendarCellRenderContext) => VNodeChild
> & { class?: string | undefined; style?: StyleValue | undefined }
export type DatePickerPopoverProps = DatePickerPopoverOptions &
  DatePickerPopoverAppearance<DatePickerStyle>
export type PickerAppearance = DatePickerAppearance<
  DatePickerInputProps,
  DatePickerEndpointProps,
  DatePickerCalendarProps,
  DatePickerPopoverProps,
  DatePickerStyle
>
