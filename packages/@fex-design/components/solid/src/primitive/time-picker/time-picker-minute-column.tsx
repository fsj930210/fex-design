import { createMinuteOptions, resolveDisabledTime } from '@fex-design/core/time-picker/options'
import { createMemo, splitProps } from 'solid-js'
import { TimePickerColumn } from './time-picker-column'
import { useTimePickerContext } from './time-picker-context'
import type { TimePickerNumericColumnProps } from './column.types'

export function TimePickerMinuteColumn(props: TimePickerNumericColumnProps) {
  const [local, rest] = splitProps(props, ['columnProps', 'step', 'isItemDisabled'])
  const context = useTimePickerContext('TimePickerMinuteColumn')
  const options = createMemo(() =>
    createMinuteOptions(
      local.step,
      resolveDisabledTime(context.disabledTime(), context.snapshot().value).minutes,
    ).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(local.isItemDisabled?.(item.value)),
    })),
  )
  return (
    <TimePickerColumn
      {...rest}
      {...local.columnProps}
      options={options()}
      selectedValue={context.snapshot().value?.minute}
      onSelect={(value) => context.controller.selectMinute(Number(value))}
    />
  )
}
