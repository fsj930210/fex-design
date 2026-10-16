import { splitProps } from 'solid-js'
import type { CalendarValue } from '@fex-design/core/calendar'
import { RangePickerRoot, RangePickerTrigger } from '@fex-design/solid/primitive/date-picker'
import { RangePickerBody } from './range-picker-body'
import type { RangePickerProps } from './range-picker.types'
export function RangePicker<TValue extends CalendarValue = CalendarValue>(props: RangePickerProps<TValue>) {
  const [local, options] = splitProps(props, ['startPlaceholder', 'endPlaceholder', 'separator', 'suffix', 'size', 'variant', 'class', 'style', 'ref', 'triggerRender', 'panelRender', 'containerRender', 'footer'])
  return <RangePickerRoot {...options} containerRender={local.containerRender}>
    <RangePickerTrigger startPlaceholder={local.startPlaceholder} endPlaceholder={local.endPlaceholder} separator={local.separator} suffix={local.suffix} size={local.size} variant={local.variant} class={local.class} style={local.style} ref={local.ref}>{local.triggerRender}</RangePickerTrigger>
    <RangePickerBody<TValue> panelRender={local.panelRender} footer={local.footer} />
  </RangePickerRoot>
}
