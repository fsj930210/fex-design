import type { JSX } from 'solid-js'
import type { CalendarCellRenderContext } from '@fex-design/core/calendar'
import type {
  DatePickerAppearance,
  DatePickerInputOptions,
  DatePickerCalendarOptions,
  DatePickerPopoverAppearance,
} from '@fex-design/core/date-picker/appearance'
import type { DatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
export type DatePickerStyle = JSX.CSSProperties | string
export type DatePickerEndpointProps = {
  'aria-haspopup'?: never
  'aria-expanded'?: never
  'data-slot'?: never
  'data-state'?: never
  'data-range-part'?: never
  'data-active'?: never
} & Pick<
  JSX.InputHTMLAttributes<HTMLInputElement>,
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
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onPointerDown'
  | 'onPointerUp'
  | 'class'
  | 'style'
> &
  JSX.AriaAttributes & { [data: `data-${string}`]: string | number | boolean | undefined }
export type DatePickerInputProps = DatePickerEndpointProps &
  DatePickerInputOptions<DatePickerStyle, JSX.Element>
export type DatePickerCalendarProps = DatePickerCalendarOptions<
  DatePickerStyle,
  (context: CalendarCellRenderContext) => JSX.Element
> & { class?: string | undefined; style?: DatePickerStyle | undefined }
export type DatePickerPopoverProps = DatePickerPopoverOptions &
  DatePickerPopoverAppearance<DatePickerStyle>
export type PickerAppearance = DatePickerAppearance<
  DatePickerInputProps,
  DatePickerEndpointProps,
  DatePickerCalendarProps,
  DatePickerPopoverProps,
  DatePickerStyle
>
