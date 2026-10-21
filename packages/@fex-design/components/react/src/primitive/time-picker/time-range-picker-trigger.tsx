import { useRef, type ReactNode } from 'react'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
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
import { ClockIcon } from '@fex-design/react/icons/clock'
import { InputRoot, InputPrefix, InputSuffix, InputClear, type InputRootProps } from '../input'
import { TimePickerTrigger } from './time-picker-trigger'
import type { TimePickerInputProps } from './time-picker-input-props'
import { useTimeRangePickerContext } from './time-range-picker-context'

export interface TimeRangePickerTriggerProps extends Pick<
  InputRootProps,
  'className' | 'style' | 'size' | 'variant' | 'dir'
> {
  startInputProps?: TimePickerInputProps | undefined
  endInputProps?: TimePickerInputProps | undefined
  placeholder?: readonly [string, string] | undefined
  allowClear?: boolean | undefined
  prefix?: ReactNode | undefined
  suffix?: ReactNode | undefined
  'aria-invalid'?: 'false' | 'true' | 'grammar' | 'spelling' | undefined
  'data-warning'?: string | undefined
}
export function TimeRangePickerTrigger(props: TimeRangePickerTriggerProps) {
  const range = useTimeRangePickerContext()
  const fields = useRef<Partial<Record<TimeRangePart, HTMLInputElement>>>({})
  // Synchronize the core confirmation request with the rendered endpoint input.
  useIsomorphicLayoutEffect(() => {
    const request = range.snapshot.focusRequest
    if (range.snapshot.open && request) fields.current[request.part]?.focus({ preventScroll: true })
  }, [range.snapshot.focusRequest, range.snapshot.open])
  const snapshot = () => range.snapshot
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
          className={props.className}
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
              fields.current.start = element ?? undefined
            }}
            type="text"
            data-slot="time-range-input"
            data-range-part="start"
            data-active={(snapshot().open && snapshot().activePart === 'start') || undefined}
            className={cn(
              inputControlClassName,
              timeRangePickerInputClassName,
              native('start').className,
            )}
            aria-invalid={props['aria-invalid'] ?? native('start')['aria-invalid']}
            aria-label={native('start')['aria-label'] ?? '开始时间'}
            placeholder={props.placeholder?.[0] ?? '开始时间'}
            value={
              snapshot().open && snapshot().activePart === 'start'
                ? state.snapshot.inputValue
                : display(snapshot().draft[0])
            }
            disabled={range.options.disabled}
            readOnly={range.options.readOnly}
            onFocus={(event) => {
              native('start').onFocus?.(event)
              activate('start', state.controller)
            }}
            onBlur={(event) => {
              native('start').onBlur?.(event)
              state.controller.resetInput()
            }}
            onInput={(event) => state.controller.input(event.currentTarget.value)}
          />
          <span aria-hidden="true" className="shrink-0 text-muted-foreground">
            →
          </span>
          <input
            {...native('end')}
            ref={(element) => {
              fields.current.end = element ?? undefined
            }}
            type="text"
            data-slot="time-range-input"
            data-range-part="end"
            data-active={(snapshot().open && snapshot().activePart === 'end') || undefined}
            className={cn(
              inputControlClassName,
              timeRangePickerInputClassName,
              native('end').className,
            )}
            aria-invalid={props['aria-invalid'] ?? native('end')['aria-invalid']}
            aria-label={native('end')['aria-label'] ?? '结束时间'}
            placeholder={props.placeholder?.[1] ?? '结束时间'}
            value={
              snapshot().open && snapshot().activePart === 'end'
                ? state.snapshot.inputValue
                : display(snapshot().draft[1])
            }
            disabled={range.options.disabled}
            readOnly={range.options.readOnly}
            onFocus={(event) => {
              native('end').onFocus?.(event)
              activate('end', state.controller)
            }}
            onBlur={(event) => {
              native('end').onBlur?.(event)
              state.controller.resetInput()
            }}
            onInput={(event) => state.controller.input(event.currentTarget.value)}
          />
          <div data-slot="time-picker-affix" className={timePickerAffixClassName}>
            <InputSuffix>{props.suffix ?? <ClockIcon className="size-4" />}</InputSuffix>
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
