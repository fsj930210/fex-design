import type { CalendarValue } from '@fex-design/core/calendar'
import { RangePickerContent, RangePickerPanelGroup, DatePickerFooter, useRangePickerContext } from '@fex-design/react/primitive/date-picker'
import type { RangePickerProps } from './range-picker.types'
type BodyProps<TValue extends CalendarValue> = Pick<RangePickerProps<TValue>, 'panelRender' | 'footer'>
export function RangePickerBody<TValue extends CalendarValue>(props: BodyProps<TValue>) {
  const state = useRangePickerContext('RangePicker')
  const panel = <RangePickerPanelGroup />
  return <RangePickerContent>
    {props.panelRender ? props.panelRender(panel, state) : panel}
    <DatePickerFooter>{props.footer}</DatePickerFooter>
  </RangePickerContent>
}
