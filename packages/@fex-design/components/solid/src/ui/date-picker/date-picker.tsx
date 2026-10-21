import { splitProps } from 'solid-js'
import type { CalendarValue } from '@fex-design/core/calendar'
import { DatePickerRoot, DatePickerTrigger } from '@fex-design/solid/primitive/date-picker'
import { DatePickerBody } from './date-picker-body'
import type { DatePickerProps } from './date-picker.types'
export function DatePicker<TValue extends CalendarValue = CalendarValue>(
  props: DatePickerProps<TValue>,
) {
  const [local, options] = splitProps(props, [
    'placeholder',
    'prefix',
    'suffix',
    'size',
    'variant',
    'class',
    'style',
    'ref',
    'triggerRender',
    'panelRender',
    'containerRender',
    'footer',
  ])
  return (
    <DatePickerRoot {...options} containerRender={local.containerRender}>
      <DatePickerTrigger
        placeholder={local.placeholder}
        prefix={local.prefix}
        suffix={local.suffix}
        size={local.size}
        variant={local.variant}
        class={local.class}
        style={local.style}
        ref={local.ref}
      >
        {local.triggerRender}
      </DatePickerTrigger>
      <DatePickerBody<TValue> panelRender={local.panelRender} footer={local.footer} />
    </DatePickerRoot>
  )
}
