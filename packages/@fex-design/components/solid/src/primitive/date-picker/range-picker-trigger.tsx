import { usePickerAppearance } from './appearance-context'
import type { DatePickerInputProps, DatePickerEndpointProps } from './appearance.types'
import { getPickerInputProps, getPickerControlProps } from '@fex-design/core/date-picker/safe-props'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { getDatePickerInputAttributes } from '@fex-design/core/date-picker/input'
import {
  getRangePickerInputPlaceholder,
  getRangePickerSeparator,
  isPickerContentProvided,
} from '@fex-design/core/date-picker/view'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { Show, createEffect, createMemo, on, mergeProps, splitProps, type JSX } from 'solid-js'
import { createPickerTrigger } from './create-picker-trigger'
import { cn } from '@fex-design/utils'
import { CalendarIcon } from '@fex-design/solid/icons/calendar'
import {
  InputRoot,
  InputControl,
  InputClear,
  InputPrefix,
  InputSuffix,
  type InputRootProps,
} from '../input'
import { useRangePickerContext, type RangePickerContextValue } from './context'
import {
  datePickerAffixClassName,
  datePickerRangeFieldClassName,
  datePickerRangeTriggerClassName,
  datePickerInputPreviewClassName,
  datePickerRangeInputClassName,
  datePickerRangeInputControlClassName,
  datePickerRangeSeparatorClassName,
} from '@fex-design/components-styles/date-picker'

export interface RangePickerTriggerBinding {
  props: JSX.HTMLAttributes<HTMLElement>
  ref: (element: HTMLElement | null) => void
  state: RangePickerContextValue
}
export type RangePickerTriggerProps = Omit<
  InputRootProps,
  | 'value'
  | 'defaultValue'
  | 'onValueChange'
  | 'onClear'
  | 'readOnly'
  | 'children'
  | 'prefix'
  | 'onFocus'
  | 'onClick'
  | 'ref'
> & {
  ref?: ((element: HTMLElement) => void) | undefined
  onFocus?: JSX.EventHandlerUnion<HTMLElement, FocusEvent> | undefined
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent> | undefined
  children?: ((binding: RangePickerTriggerBinding) => JSX.Element) | undefined
  inputProps?: DatePickerInputProps | undefined
  startInputProps?: DatePickerEndpointProps | undefined
  endInputProps?: DatePickerEndpointProps | undefined
  startPlaceholder?: string | undefined
  endPlaceholder?: string | undefined
  separator?: JSX.Element | undefined
  suffix?: JSX.Element | undefined
}

export function RangePickerTrigger(props: RangePickerTriggerProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'inputProps',
    'startInputProps',
    'endInputProps',
    'startPlaceholder',
    'endPlaceholder',
    'separator',
    'suffix',
    'class',
    'ref',
    'onClick',
    'onFocus',
  ])
  const context = useRangePickerContext('RangePickerTrigger')
  const appearance = usePickerAppearance()
  const input = () => getPickerInputProps(local.inputProps ?? appearance().inputProps)
  const start = () =>
    getPickerControlProps(input(), local.startInputProps ?? appearance().startInputProps, true)
  const end = () =>
    getPickerControlProps(input(), local.endInputProps ?? appearance().endInputProps, true)
  const trigger = createPickerTrigger(context)
  const focusRequest = createMemo(() => context.focusRequest)
  // Track only focus requests; hover/value updates must not steal input focus.
  createEffect(
    on(focusRequest, (request) => {
      if (request && context.open() && !local.children) trigger.focusInput(request.part)
    }),
  )
  const ref = (element: HTMLElement | null) => {
    trigger.ref(element)
    if (element) local.ref?.(element)
  }
  const triggerProps = mergeProps(rest, {
    get size() {
      return rest.size ?? input().size ?? 'md'
    },
    get variant() {
      return rest.variant ?? input().variant ?? 'outlined'
    },
    get style() {
      return mergeStyle(input().styles?.root, input().style, rest.style)
    },
    get class() {
      return cn(
        datePickerRangeTriggerClassName,
        input().classNames?.root,
        input().class,
        local.class,
      )
    },
    'aria-haspopup': 'dialog' as const,
    get 'aria-expanded'() {
      return context.open()
    },
    get 'data-state'() {
      return context.open() ? 'open' : 'closed'
    },
    onClick(event: MouseEvent) {
      callEventHandler(local.onClick, event)
      trigger.click(event)
    },
    onFocus(event: FocusEvent) {
      callEventHandler(local.onFocus, event)
      trigger.focus(event)
    },
  })
  const [, fieldProps] = splitProps(triggerProps, ['onFocus'])
  return local.children ? (
    local.children({ props: triggerProps, ref, state: context })
  ) : (
    <InputRoot {...fieldProps} ref={ref} value={''} disabled={context.disabled} readOnly={true}>
      <div class={datePickerRangeFieldClassName}>
        {isPickerContentProvided(input().prefix) ? (
          <InputPrefix class={input().classNames?.prefix} style={input().styles?.prefix}>
            {input().prefix}
          </InputPrefix>
        ) : null}
        <InputRoot
          data-range-part="start"
          value={context.startText()}
          disabled={context.disabled}
          readOnly={true}
          data-active={context.open() && context.activePart() === 'start' ? 'true' : undefined}
          class={datePickerRangeInputClassName}
        >
          <InputControl
            {...getDatePickerInputAttributes(start())}
            class={cn(
              datePickerRangeInputControlClassName,
              context.triggerView.startPreview && datePickerInputPreviewClassName,
              input().classNames?.control,
              start().class,
            )}
            style={mergeStyle(input().styles?.control, start().style)}
            placeholder={getRangePickerInputPlaceholder(
              'start',
              local.startPlaceholder ?? start().placeholder,
            )}
            onFocus={(event) => {
              callEventHandler(start().onFocus, event)
              callEventHandler(local.onFocus, event)
              trigger.focus(event, 'start')
            }}
          />
        </InputRoot>
      </div>
      <span
        aria-hidden="true"
        data-default-separator={local.separator == null ? 'true' : undefined}
        class={cn(datePickerRangeSeparatorClassName, appearance().classNames?.separator)}
        style={appearance().styles?.separator}
      >
        {getRangePickerSeparator(local.separator)}
      </span>
      <div class={datePickerRangeFieldClassName}>
        <InputRoot
          data-range-part="end"
          value={context.endText()}
          disabled={context.disabled}
          readOnly={true}
          data-active={context.open() && context.activePart() === 'end' ? 'true' : undefined}
          class={datePickerRangeInputClassName}
        >
          <InputControl
            {...getDatePickerInputAttributes(end())}
            class={cn(
              datePickerRangeInputControlClassName,
              context.triggerView.endPreview && datePickerInputPreviewClassName,
              input().classNames?.control,
              end().class,
            )}
            style={mergeStyle(input().styles?.control, end().style)}
            placeholder={getRangePickerInputPlaceholder(
              'end',
              local.endPlaceholder ?? end().placeholder,
            )}
            onFocus={(event) => {
              callEventHandler(end().onFocus, event)
              callEventHandler(local.onFocus, event)
              trigger.focus(event, 'end')
            }}
          />
        </InputRoot>
        <div data-slot="date-picker-affix" class={datePickerAffixClassName}>
          <InputSuffix class={input().classNames?.suffix} style={input().styles?.suffix}>
            {local.suffix ?? input().suffix ?? <CalendarIcon class="size-4" />}
          </InputSuffix>
          <Show when={context.canClear}>
            <InputClear
              class={input().classNames?.clear}
              style={input().styles?.clear}
              aria-label="清除日期"
              onPointerDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                context.clear()
              }}
            />
          </Show>
        </div>
      </div>
    </InputRoot>
  )
}
