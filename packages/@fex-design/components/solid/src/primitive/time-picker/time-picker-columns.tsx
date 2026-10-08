import {
  createHourOptions,
  createMinuteOptions,
  createPeriodOptions,
  createSecondOptions,
  getDisplayedHour,
  getDisplayedPeriod,
  resolveDisabledTime,
} from '@fex-design/core/time-picker/options'
import type { TimePeriod } from '@fex-design/core/time-picker/types'
import { createMemo, type JSX } from 'solid-js'
import { TimePickerColumn } from './time-picker-column'
import { useTimePickerContext } from './time-picker-context'

export interface TimePickerNumericColumnProps extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  step?: number | undefined
  disabled?: boolean | undefined
  isItemDisabled?: ((value: number) => boolean) | undefined
}

export function TimePickerHourColumn(props: TimePickerNumericColumnProps) {
  const context = useTimePickerContext('TimePickerHourColumn')
  const options = createMemo(() =>
    createHourOptions({
      step: props.step,
      use12Hours: context.use12Hours(),
      period: context.snapshot().value ? getDisplayedPeriod(context.snapshot().value!) : 'am',
      disabled: resolveDisabledTime(context.disabledTime(), context.snapshot().value).hours,
    }).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(props.isItemDisabled?.(item.value)),
    })),
  )
  const selected = () =>
    context.snapshot().value
      ? getDisplayedHour(context.snapshot().value!, context.use12Hours())
      : undefined
  return (
    <TimePickerColumn
      {...props}
      options={options()}
      selectedValue={selected()}
      onSelect={(value) => context.controller.selectHour(Number(value), context.use12Hours())}
    />
  )
}

export function TimePickerMinuteColumn(props: TimePickerNumericColumnProps) {
  const context = useTimePickerContext('TimePickerMinuteColumn')
  const options = createMemo(() =>
    createMinuteOptions(
      props.step,
      resolveDisabledTime(context.disabledTime(), context.snapshot().value).minutes,
    ).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(props.isItemDisabled?.(item.value)),
    })),
  )
  return (
    <TimePickerColumn
      {...props}
      options={options()}
      selectedValue={context.snapshot().value?.minute}
      onSelect={(value) => context.controller.selectMinute(Number(value))}
    />
  )
}

export function TimePickerSecondColumn(props: TimePickerNumericColumnProps) {
  const context = useTimePickerContext('TimePickerSecondColumn')
  const options = createMemo(() =>
    createSecondOptions(
      props.step,
      resolveDisabledTime(context.disabledTime(), context.snapshot().value).seconds,
    ).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(props.isItemDisabled?.(item.value)),
    })),
  )
  return (
    <TimePickerColumn
      {...props}
      options={options()}
      selectedValue={context.snapshot().value?.second}
      onSelect={(value) => context.controller.selectSecond(Number(value))}
    />
  )
}

export interface TimePickerPeriodColumnProps extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  disabled?: boolean | undefined
  labels?: { am: string; pm: string } | undefined
  isItemDisabled?: ((value: TimePeriod) => boolean) | undefined
}

export function TimePickerPeriodColumn(props: TimePickerPeriodColumnProps) {
  const context = useTimePickerContext('TimePickerPeriodColumn')
  const options = createMemo(() =>
    createPeriodOptions(props.labels).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(props.isItemDisabled?.(item.value)),
    })),
  )
  const selected = () =>
    context.snapshot().value ? getDisplayedPeriod(context.snapshot().value!) : undefined
  return context.use12Hours() ? (
    <TimePickerColumn
      {...props}
      options={options()}
      selectedValue={selected()}
      onSelect={(value) => context.controller.selectPeriod(value as TimePeriod)}
    />
  ) : null
}
