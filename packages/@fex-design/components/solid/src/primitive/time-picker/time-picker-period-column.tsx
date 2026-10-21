import { createPeriodOptions, getDisplayedPeriod } from '@fex-design/core/time-picker/options'
import type { TimePeriod } from '@fex-design/core/time-picker/types'
import { createMemo, splitProps, Show } from 'solid-js'
import { TimePickerColumn } from './time-picker-column'
import { useTimePickerContext } from './time-picker-context'
import type { TimePickerPeriodColumnProps } from './column.types'

export function TimePickerPeriodColumn(props: TimePickerPeriodColumnProps) {
  const [local, rest] = splitProps(props, ['columnProps', 'labels', 'isItemDisabled'])
  const context = useTimePickerContext('TimePickerPeriodColumn')
  const options = createMemo(() =>
    createPeriodOptions(local.labels).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(local.isItemDisabled?.(item.value)),
    })),
  )
  const selected = () =>
    context.snapshot().value ? getDisplayedPeriod(context.snapshot().value!) : undefined
  return (
    <Show when={context.use12Hours()}>
      <TimePickerColumn
        {...rest}
        {...local.columnProps}
        options={options()}
        selectedValue={selected()}
        onSelect={(value) => context.controller.selectPeriod(value as TimePeriod)}
      />
    </Show>
  )
}
