import type { CalendarValue } from '@fex-design/core/calendar'
import { DatePickerRoot, DatePickerTrigger } from '@fex-design/react/primitive/date-picker'
import { DatePickerBody } from './date-picker-body'
import type { DatePickerProps } from './date-picker.types'
export function DatePicker<TValue extends CalendarValue = CalendarValue>({ placeholder, prefix, suffix, size, variant, className, style, ref, triggerRender, panelRender, containerRender, footer, ...options }: DatePickerProps<TValue>) {
  
  return <DatePickerRoot {...options} containerRender={containerRender}>
    <DatePickerTrigger placeholder={placeholder} prefix={prefix} suffix={suffix} size={size} variant={variant} className={className} style={style} ref={ref}>{triggerRender}</DatePickerTrigger>
    <DatePickerBody<TValue> panelRender={panelRender} footer={footer} />
  </DatePickerRoot>
}
