import { usePickerAppearance } from './appearance-context'
import type { DatePickerInputProps } from './appearance.types'
import { getPickerInputProps, getPickerControlProps } from '@fex-design/core/date-picker/safe-props'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { getDatePickerInputAttributes } from '@fex-design/core/date-picker/input'
import { isPickerContentProvided } from '@fex-design/core/date-picker/view'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { Show, mergeProps, splitProps, type JSX } from 'solid-js'
import { createPickerTrigger } from './create-picker-trigger'
import { cn } from '@fex-design/utils'
import { CalendarIcon } from '@fex-design/solid/icons/calendar'
import { InputRoot, InputControl, InputClear, InputPrefix, InputSuffix, type InputRootProps } from '../input'
import { useDatePickerContext, type DatePickerContextValue } from './context'
import { DatePickerTags } from './date-picker-tags'
import { datePickerAffixClassName, datePickerTriggerClassName, datePickerInputPreviewClassName, datePickerMultipleTagsClassName, datePickerMultipleInputClassName } from '@fex-design/components-styles/date-picker'

export interface DatePickerTriggerBinding {
  props: JSX.HTMLAttributes<HTMLElement>
  ref: (element: HTMLElement | null) => void
  state: DatePickerContextValue
}
export type DatePickerTriggerProps = Omit<InputRootProps, 'value' | 'defaultValue' | 'onValueChange' | 'onClear' | 'readOnly' | 'children' | 'prefix' | 'onFocus' | 'onClick' | 'ref'> & {
  ref?: ((element: HTMLElement) => void) | undefined
  onFocus?: JSX.EventHandlerUnion<HTMLElement, FocusEvent> | undefined
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent> | undefined
  children?: ((binding: DatePickerTriggerBinding) => JSX.Element) | undefined
  inputProps?: DatePickerInputProps | undefined
  placeholder?: string | undefined
  prefix?: JSX.Element | undefined
  suffix?: JSX.Element | undefined
}

export function DatePickerTrigger(props: DatePickerTriggerProps) {
  const [local, rest] = splitProps(props, ['children','inputProps','placeholder','prefix','suffix','class','ref','onClick','onFocus'])
  const context = useDatePickerContext('DatePickerTrigger')
  const appearance = usePickerAppearance()
  const input = () => getPickerInputProps(local.inputProps ?? appearance().inputProps)
  const control = () => getPickerControlProps(input())
  const trigger = createPickerTrigger(context)
  const ref = (element: HTMLElement | null) => { trigger.ref(element); if (element) local.ref?.(element) }
  const triggerProps = mergeProps(rest, { get size() { return rest.size ?? input().size ?? 'md' }, get variant() { return rest.variant ?? input().variant ?? 'outlined' }, get style() { return mergeStyle(input().styles?.root, input().style, rest.style) }, get class() { return cn(datePickerTriggerClassName, input().classNames?.root, input().class, local.class) }, 'aria-haspopup': 'dialog' as const, get 'aria-expanded'() { return context.open() }, get 'data-state'() { return context.open() ? 'open' : 'closed' },
    onClick(event: MouseEvent) { callEventHandler(local.onClick, event); trigger.click(event) },
    onFocus(event: FocusEvent) { callEventHandler(local.onFocus, event); trigger.focus(event) },
  })
  const [, fieldProps] = splitProps(triggerProps, ['onFocus'])
  return local.children ? local.children({ props: triggerProps, ref, state: context }) : (
    <InputRoot {...fieldProps} ref={ref} value={context.inputValue()} disabled={context.disabled} readOnly={true}>
      {isPickerContentProvided(local.prefix ?? input().prefix) ? <InputPrefix class={input().classNames?.prefix} style={input().styles?.prefix}>{local.prefix ?? input().prefix}</InputPrefix> : null}
      {context.triggerView.showTags ? <DatePickerTags class={datePickerMultipleTagsClassName} /> : null}
      <InputControl {...getDatePickerInputAttributes(control())} onFocus={event => { callEventHandler(control().onFocus, event); callEventHandler(local.onFocus, event); trigger.focus(event) }} class={cn(context.triggerView.preview && datePickerInputPreviewClassName, context.triggerView.hasTags && datePickerMultipleInputClassName, input().classNames?.control)} style={input().styles?.control} placeholder={context.triggerView.hasTags ? '' : (local.placeholder ?? input().placeholder ?? context.format)} />
      <div data-slot="date-picker-affix" class={datePickerAffixClassName}>
        <InputSuffix class={input().classNames?.suffix} style={input().styles?.suffix}>{local.suffix ?? input().suffix ?? <CalendarIcon class="size-4" />}</InputSuffix>
        <Show when={context.canClear}><InputClear class={input().classNames?.clear} style={input().styles?.clear} aria-label="清除日期" onPointerDown={event => { event.preventDefault(); event.stopPropagation() }} onClick={event => { event.preventDefault(); event.stopPropagation(); context.clear() }} /></Show>
      </div>
    </InputRoot>
  )
}
