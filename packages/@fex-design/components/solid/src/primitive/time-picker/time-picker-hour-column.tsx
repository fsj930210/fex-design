import {
  createHourOptions,
  getDisplayedHour,
  getDisplayedPeriod,
  resolveDisabledTime,
} from '@fex-design/core/time-picker/options'
import { createMemo, splitProps } from 'solid-js'
import { TimePickerColumn } from './time-picker-column'
import { useTimePickerContext } from './time-picker-context'
import type { TimePickerNumericColumnProps } from './column.types'

export function TimePickerHourColumn(props: TimePickerNumericColumnProps) {
  const [local, rest] = splitProps(props, ['columnProps', 'step', 'isItemDisabled'])
  const context = useTimePickerContext('TimePickerHourColumn')
  const options = createMemo(() =>
    createHourOptions({
      step: local.step,
      use12Hours: context.use12Hours(),
      period: context.snapshot().value ? getDisplayedPeriod(context.snapshot().value!) : 'am',
      disabled: resolveDisabledTime(context.disabledTime(), context.snapshot().value).hours,
    }).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(local.isItemDisabled?.(item.value)),
    })),
  )
  const selected = () =>
    context.snapshot().value
      ? getDisplayedHour(context.snapshot().value!, context.use12Hours())
      : undefined
  return (
    <TimePickerColumn
      {...rest}
      {...local.columnProps}
      options={options()}
      selectedValue={selected()}
      onSelect={(value) => context.controller.selectHour(Number(value), context.use12Hours())}
    />
  )
}
