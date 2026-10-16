import type { DatePickerStyle } from './style'
import type { TemplateRef } from '@angular/core'
import type { InputAttributes } from '@fex-design/angular/primitive/input'
import type { CalendarCellRenderContext } from '@fex-design/core/calendar'
import type { DatePickerAppearance, DatePickerInputOptions, DatePickerCalendarOptions, DatePickerPopoverAppearance } from '@fex-design/core/date-picker/appearance'
import type { DatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
export type DatePickerEndpointProps = { 'aria-haspopup'?: never; 'aria-expanded'?: never; 'data-slot'?: never; 'data-state'?: never; 'data-range-part'?: never; 'data-active'?: never } & Pick<InputAttributes, 'class' | 'style' | 'onFocus' | 'onBlur' | 'onClick' | 'onKeyDown' | 'onKeyUp' | 'onPointerDown' | 'onPointerUp'> & { id?: string; name?: string; form?: string; title?: string; placeholder?: string; autoComplete?: string; required?: boolean; [aria: `aria-${string}`]: string | number | boolean | undefined } & { [data: `data-${string}`]: string | number | boolean | undefined }
export type DatePickerInputProps = DatePickerEndpointProps & DatePickerInputOptions<DatePickerStyle, string | number | TemplateRef<unknown>>
export type DatePickerCalendarProps = DatePickerCalendarOptions<DatePickerStyle, TemplateRef<CalendarCellRenderContext>> & { class?: string | undefined; style?: DatePickerStyle | undefined }
export type DatePickerPopoverProps = DatePickerPopoverOptions & DatePickerPopoverAppearance<DatePickerStyle>
export type PickerAppearance = DatePickerAppearance<DatePickerInputProps, DatePickerEndpointProps, DatePickerCalendarProps, DatePickerPopoverProps, DatePickerStyle>
