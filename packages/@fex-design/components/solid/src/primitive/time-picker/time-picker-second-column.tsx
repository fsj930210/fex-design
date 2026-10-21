import { createSecondOptions, resolveDisabledTime } from '@fex-design/core/time-picker/options'
import { createMemo, splitProps } from 'solid-js'
import { TimePickerColumn } from './time-picker-column'
import { useTimePickerContext } from './time-picker-context'
import type { TimePickerNumericColumnProps } from './column.types'

export function TimePickerSecondColumn(props: TimePickerNumericColumnProps) {
  const [local, rest] = splitProps(props, ['columnProps', 'step', 'isItemDisabled'])
  const context = useTimePickerContext('TimePickerSecondColumn')
  const options = createMemo(() =>
    createSecondOptions(
      local.step,
      resolveDisabledTime(context.disabledTime(), context.snapshot().value).seconds,
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
      selectedValue={context.snapshot().value?.second}
      onSelect={(value) => context.controller.selectSecond(Number(value))}
    />
  )
}
