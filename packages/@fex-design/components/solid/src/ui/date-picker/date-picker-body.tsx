import { Show, type JSX } from 'solid-js'
import type { CalendarValue } from '@fex-design/core/calendar'
import { DatePickerContent, DatePickerPanel, DatePickerFooter, useDatePickerContext } from '@fex-design/solid/primitive/date-picker'
import type { DatePickerProps } from './date-picker.types'
type BodyProps<TValue extends CalendarValue> = Pick<DatePickerProps<TValue>, 'panelRender' | 'footer'>
export function DatePickerBody<TValue extends CalendarValue>(props: BodyProps<TValue>) {
  const state = useDatePickerContext('DatePicker')
  const panel = () => <DatePickerPanel<TValue> />
  return <DatePickerContent>
    <Show when={props.panelRender} fallback={panel()}>{render => render()(panel(), state)}</Show>
    <DatePickerFooter>{props.footer}</DatePickerFooter>
  </DatePickerContent>
}
