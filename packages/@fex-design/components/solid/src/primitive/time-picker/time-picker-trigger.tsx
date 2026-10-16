import { timePickerAffixClassName } from '@fex-design/components-styles/time-picker'
import { Show, mergeProps, splitProps, type JSX } from 'solid-js'
import { ClockIcon } from '@fex-design/solid/icons/clock'
import {
  InputClear,
  InputControl,
  InputPrefix,
  InputRoot,
  InputSuffix,
  type InputRootProps,
} from '../input'
import { useTimePickerTrigger } from './use-time-picker-trigger'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import type { TimePickerContextValue } from './time-picker-context'
import { useTimePickerContext } from './time-picker-context'

export interface TimePickerTriggerProps extends Omit<
  InputRootProps,
  'value' | 'defaultValue' | 'onValueChange' | 'onClear' | 'children' | 'prefix' | 'ref' | 'onClick' | 'onFocus' | 'onBlur'
> {
  ref?: ((element: HTMLElement) => void) | undefined
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent> | undefined
  onFocus?: JSX.EventHandlerUnion<HTMLElement, FocusEvent> | undefined
  onBlur?: JSX.EventHandlerUnion<HTMLElement, FocusEvent> | undefined
  children?: ((binding: { props: JSX.HTMLAttributes<HTMLElement>; ref: (element: HTMLElement) => void; state: TimePickerContextValue }) => JSX.Element) | undefined
  invalid?: boolean | undefined
  allowClear?: boolean | undefined
  placeholder?: string | undefined
  prefix?: JSX.Element | undefined
  suffix?: JSX.Element | undefined
  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement> | undefined
}

export function TimePickerTrigger(props: TimePickerTriggerProps) {
  const context = useTimePickerContext('TimePickerTrigger')
  const [local, rest] = splitProps(props, [
    'children',
    'ref',
    'onBlur',
    'onClick',
    'onFocus',
    'invalid',
    'allowClear',
    'placeholder',
    'prefix',
    'suffix',
    'inputProps',
  ])
  const trigger = useTimePickerTrigger()
  const ref = (element: HTMLElement) => { trigger.ref(element); local.ref?.(element) }
  const bindingProps = mergeProps(rest, trigger.props, {
    onClick: (event: MouseEvent) => { callEventHandler(local.onClick, event); callEventHandler(trigger.props.onClick, event) },
    onFocus: (event: FocusEvent) => { callEventHandler(local.onFocus, event); callEventHandler(trigger.props.onFocus, event) },
    onBlur: (event: FocusEvent) => { callEventHandler(local.onBlur, event); callEventHandler(trigger.props.onBlur, event) },
  })
  const text = () => context.snapshot().inputValue
  const canClear = () => local.allowClear !== false && Boolean(text()) && !context.disabled() && !context.readOnly()
  const input = context.controller.input
  const clear = context.controller.clear
  if (local.children) return local.children({ props: bindingProps, ref, state: context })
  return (
        <InputRoot
          {...bindingProps}
          ref={ref}
          value={text()}
          disabled={context.disabled()}
          readOnly={context.readOnly()}
          onValueChange={input}
          {...(local.allowClear === false ? {} : { onClear: clear })}
        >
          <Show when={local.prefix}>
            <InputPrefix>{local.prefix}</InputPrefix>
          </Show>
          <InputControl aria-label="Time" {...local.inputProps} aria-invalid={local.invalid || local.inputProps?.['aria-invalid']} placeholder={local.placeholder ?? local.inputProps?.placeholder ?? context.format()} />
          <div data-slot="time-picker-affix" class={timePickerAffixClassName}>
            <InputSuffix>{local.suffix ?? <ClockIcon class="size-4" />}</InputSuffix>
            <Show when={canClear()}>
              <InputClear onPointerDown={event => { event.preventDefault(); event.stopPropagation() }} onClick={event => { event.preventDefault(); event.stopPropagation(); clear() }} />
            </Show>
          </div>
        </InputRoot>
  )
}
