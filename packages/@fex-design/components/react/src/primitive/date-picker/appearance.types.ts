import type { AriaAttributes, ComponentProps, CSSProperties, ReactNode } from 'react'
import type { CalendarCellRenderContext } from '@fex-design/core/calendar'
import type {
  DatePickerAppearance,
  DatePickerInputOptions,
  DatePickerCalendarOptions,
  DatePickerPopoverAppearance,
} from '@fex-design/core/date-picker/appearance'
import type { DatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
export type DatePickerStyle = CSSProperties & {
  [variable: `--${string}`]: string | number | undefined
}
export type DatePickerEndpointProps = {
  'aria-haspopup'?: never
  'aria-expanded'?: never
  'data-slot'?: never
  'data-state'?: never
  'data-range-part'?: never
  'data-active'?: never
} & Pick<
  ComponentProps<'input'>,
  | 'id'
  | 'name'
  | 'form'
  | 'title'
  | 'placeholder'
  | 'autoComplete'
  | 'required'
  | 'onFocus'
  | 'onBlur'
  | 'onClick'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onPointerDown'
  | 'onPointerUp'
  | 'className'
  | 'style'
> &
  AriaAttributes & { [data: `data-${string}`]: string | number | boolean | undefined }
export type DatePickerInputProps = DatePickerEndpointProps &
  DatePickerInputOptions<DatePickerStyle, ReactNode>
export type DatePickerCalendarProps = DatePickerCalendarOptions<
  DatePickerStyle,
  (context: CalendarCellRenderContext) => ReactNode
> & { className?: string | undefined; style?: DatePickerStyle | undefined }
export type DatePickerPopoverProps = DatePickerPopoverOptions &
  DatePickerPopoverAppearance<DatePickerStyle>
export type PickerAppearance = DatePickerAppearance<
  DatePickerInputProps,
  DatePickerEndpointProps,
  DatePickerCalendarProps,
  DatePickerPopoverProps,
  DatePickerStyle
>
