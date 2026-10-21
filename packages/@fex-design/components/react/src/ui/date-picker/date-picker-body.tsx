import type { CalendarValue } from '@fex-design/core/calendar'
import {
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
  useDatePickerContext,
} from '@fex-design/react/primitive/date-picker'
import type { DatePickerProps } from './date-picker.types'
type BodyProps<TValue extends CalendarValue> = Pick<
  DatePickerProps<TValue>,
  'panelRender' | 'footer'
>
export function DatePickerBody<TValue extends CalendarValue>(props: BodyProps<TValue>) {
  const state = useDatePickerContext('DatePicker')
  const panel = <DatePickerPanel<TValue> />
  return (
    <DatePickerContent>
      {props.panelRender ? props.panelRender(panel, state) : panel}
      <DatePickerFooter>{props.footer}</DatePickerFooter>
    </DatePickerContent>
  )
}
