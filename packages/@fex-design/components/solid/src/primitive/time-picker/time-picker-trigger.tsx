import { format as formatDate, parse } from '@fex-design/core/date/utils'
import { createEffect, createSignal, Show, splitProps, type JSX } from 'solid-js'
import { ClockIcon } from '@fex-design/solid/icons/clock'
import {
  InputClear,
  InputControl,
  InputPrefix,
  InputRoot,
  InputSuffix,
  type InputRootProps,
} from '../input'
import { PopoverTrigger } from '../popover'
import { useTimePickerContext } from './time-picker-context'

export interface TimePickerTriggerProps extends Omit<
  InputRootProps,
  'value' | 'defaultValue' | 'onValueChange' | 'onClear' | 'children' | 'prefix'
> {
  allowClear?: boolean
  placeholder?: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>
}

export function TimePickerTrigger(props: TimePickerTriggerProps) {
  const context = useTimePickerContext('TimePickerTrigger')
  const [local, rest] = splitProps(props, [
    'allowClear',
    'placeholder',
    'prefix',
    'suffix',
    'inputProps',
  ])
  const formatted = () =>
    context.snapshot().value ? formatDate(context.snapshot().value!, context.format()) : ''
  const [text, setText] = createSignal(formatted())
  createEffect(() => setText(formatted()))
  function input(next: string) {
    setText(next)
    const result = parse(next, context.format())
    if (result.valid) context.controller.change(result.value, 'input', 'smooth')
  }
  function clear() {
    setText('')
    context.controller.clear()
  }
  return (
    <PopoverTrigger>
      {(trigger) => (
        <InputRoot
          {...rest}
          {...(trigger.props as unknown as JSX.HTMLAttributes<HTMLDivElement>)}
          ref={trigger.ref as unknown as (element: HTMLDivElement) => void}
          value={text()}
          disabled={context.disabled()}
          readOnly={context.readOnly()}
          onValueChange={input}
          {...(local.allowClear === false ? {} : { onClear: clear })}
        >
          <Show when={local.prefix}>
            <InputPrefix>{local.prefix}</InputPrefix>
          </Show>
          <InputControl {...local.inputProps} placeholder={local.placeholder ?? context.format()} />
          <Show when={local.allowClear !== false && text()}>
            <InputClear />
          </Show>
          <Show when={local.allowClear === false || !text()}>
            <InputSuffix>{local.suffix ?? <ClockIcon class="size-4" />}</InputSuffix>
          </Show>
        </InputRoot>
      )}
    </PopoverTrigger>
  )
}
