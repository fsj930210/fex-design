import type { CalendarValue } from '@fex-design/core/calendar'
import { RangePickerRoot, RangePickerTrigger } from '@fex-design/react/primitive/date-picker'
import { RangePickerBody } from './range-picker-body'
import type { RangePickerProps } from './range-picker.types'
export function RangePicker<TValue extends CalendarValue = CalendarValue>({ startPlaceholder, endPlaceholder, separator, suffix, size, variant, className, style, ref, triggerRender, panelRender, containerRender, footer, ...options }: RangePickerProps<TValue>) {
  
  return <RangePickerRoot {...options} containerRender={containerRender}>
    <RangePickerTrigger startPlaceholder={startPlaceholder} endPlaceholder={endPlaceholder} separator={separator} suffix={suffix} size={size} variant={variant} className={className} style={style} ref={ref}>{triggerRender}</RangePickerTrigger>
    <RangePickerBody<TValue> panelRender={panelRender} footer={footer} />
  </RangePickerRoot>
}
