import { createEffect, on, type JSX } from 'solid-js'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { format } from '@fex-design/core/date/utils'
import { filterTimePickerInputProps } from '@fex-design/core/time-picker/input-props'
import type { TimeRangePart } from '@fex-design/core/time-picker/range-types'
import type { TimeValue, TimePickerController } from '@fex-design/core/time-picker/types'
import { inputControlClassName } from '@fex-design/components-styles/input'
import {
  timePickerAffixClassName,
  timeRangePickerInputClassName,
} from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import { ClockIcon } from '@fex-design/solid/icons/clock'
import { InputRoot, InputPrefix, InputSuffix, InputClear, type InputRootProps } from '../input'
import { TimePickerTrigger } from './time-picker-trigger'
import type { TimePickerInputProps } from './time-picker-input-props'
import { useTimeRangePickerContext } from './time-range-picker-context'

export interface TimeRangePickerTriggerProps extends Pick<
  InputRootProps,
  'class' | 'style' | 'size' | 'variant' | 'dir'
> {
  startInputProps?: TimePickerInputProps | undefined
  endInputProps?: TimePickerInputProps | undefined
  placeholder?: readonly [string, string] | undefined
  allowClear?: boolean | undefined
  prefix?: JSX.Element | undefined
  suffix?: JSX.Element | undefined
}
export function TimeRangePickerTrigger(props: TimeRangePickerTriggerProps) {
  const range = useTimeRangePickerContext()
  const snapshot = range.snapshot
  const fields: Partial<Record<TimeRangePart, HTMLInputElement>> = {}
  // Synchronize the core confirmation request with the rendered endpoint input.
  createEffect(
    on(
      () => snapshot().focusRequest,
      (request) => {
        if (snapshot().open && request) fields[request.part]?.focus({ preventScroll: true })
      },
    ),
  )
  const display = (value: TimeValue | null) =>
    value
      ? format(
          value,
          range.options.format ?? (range.options.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'),
        )
      : ''
  const native = (part: TimeRangePart) =>
    filterTimePickerInputProps(part === 'start' ? props.startInputProps : props.endInputProps)
  function activate(part: TimeRangePart, time: TimePickerController) {
    range.controller.activate(part)
    const value = range.controller.getSnapshot().draft[part === 'start' ? 0 : 1]
    time.setControlledValue(value)
    time.resetInput()
    time.scrollToValue('auto')
  }
  function open(time: TimePickerController) {
    if (!range.controller.getSnapshot().open) {
      const current = range.controller.getSnapshot()
      time.setControlledValue(current.draft[current.activePart === 'start' ? 0 : 1])
      time.resetInput()
    }
    range.controller.setOpen(true)
  }
  // Endpoint focus opens the session; moving focus to columns must not cancel it.
  return (
    <TimePickerTrigger>
      {({ props: binding, ref, state }) => (
        <InputRoot
          {...binding}
          ref={ref}
          role={undefined}
          onFocus={undefined}
          onBlur={undefined}
          value=""
          disabled={range.options.disabled}
          readOnly={range.options.readOnly}
          class={props.class}
          style={props.style}
          size={props.size}
          variant={props.variant}
          dir={props.dir}
          onClick={(event) => {
            event.stopPropagation()
            open(state.controller)
          }}
        >
          {props.prefix ? <InputPrefix>{props.prefix}</InputPrefix> : null}
          <input
            {...native('start')}
            ref={(element) => {
              fields.start = element
            }}
            type="text"
            data-slot="time-range-input"
            data-range-part="start"
            data-active={(snapshot().open && snapshot().activePart === 'start') || undefined}
            class={cn(inputControlClassName, timeRangePickerInputClassName, native('start').class)}
            aria-label={native('start')['aria-label'] ?? '开始时间'}
            placeholder={props.placeholder?.[0] ?? '开始时间'}
            value={
              snapshot().open && snapshot().activePart === 'start'
                ? state.snapshot().inputValue
                : display(snapshot().draft[0])
            }
            disabled={range.options.disabled}
            readOnly={range.options.readOnly}
            onFocus={(event) => {
              callEventHandler(native('start').onFocus, event)
              activate('start', state.controller)
            }}
            onBlur={(event) => {
              callEventHandler(native('start').onBlur, event)
              state.controller.resetInput()
            }}
            onInput={(event) => state.controller.input(event.currentTarget.value)}
          />
          <span aria-hidden="true" class="shrink-0 text-muted-foreground">
            →
          </span>
          <input
            {...native('end')}
            ref={(element) => {
              fields.end = element
            }}
            type="text"
            data-slot="time-range-input"
            data-range-part="end"
            data-active={(snapshot().open && snapshot().activePart === 'end') || undefined}
            class={cn(inputControlClassName, timeRangePickerInputClassName, native('end').class)}
            aria-label={native('end')['aria-label'] ?? '结束时间'}
            placeholder={props.placeholder?.[1] ?? '结束时间'}
            value={
              snapshot().open && snapshot().activePart === 'end'
                ? state.snapshot().inputValue
                : display(snapshot().draft[1])
            }
            disabled={range.options.disabled}
            readOnly={range.options.readOnly}
            onFocus={(event) => {
              callEventHandler(native('end').onFocus, event)
              activate('end', state.controller)
            }}
            onBlur={(event) => {
              callEventHandler(native('end').onBlur, event)
              state.controller.resetInput()
            }}
            onInput={(event) => state.controller.input(event.currentTarget.value)}
          />
          <div data-slot="time-picker-affix" class={timePickerAffixClassName}>
            <InputSuffix>{props.suffix ?? <ClockIcon class="size-4" />}</InputSuffix>
            {props.allowClear !== false &&
            snapshot().draft.some(Boolean) &&
            !range.options.disabled &&
            !range.options.readOnly ? (
              <InputClear
                aria-label="清除时间范围"
                onPointerDown={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                }}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  state.controller.clear()
                  range.controller.clear()
                }}
              />
            ) : null}
          </div>
        </InputRoot>
      )}
    </TimePickerTrigger>
  )
}
