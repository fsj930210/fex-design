import {
  createHourOptions,
  getDisplayedHour,
  getDisplayedPeriod,
  resolveDisabledTime,
} from '@fex-design/core/time-picker/options'
import { TimePickerColumn } from './time-picker-column'
import { useTimePickerContext } from './time-picker-context'
import type { TimePickerNumericColumnProps } from './column.types'

export function TimePickerHourColumn({
  step,
  columnProps,
  isItemDisabled,
  ...props
}: TimePickerNumericColumnProps) {
  const context = useTimePickerContext('TimePickerHourColumn')
  const disabled = resolveDisabledTime(context.disabledTime, context.snapshot.value).hours
  const options = createHourOptions({
    step,
    use12Hours: context.use12Hours,
    period: context.snapshot.value ? getDisplayedPeriod(context.snapshot.value) : 'am',
    disabled,
  }).map((option) => ({
    ...option,
    disabled: option.disabled || Boolean(isItemDisabled?.(option.value)),
  }))
  const selected = context.snapshot.value
    ? getDisplayedHour(context.snapshot.value, context.use12Hours)
    : undefined
  return (
    <TimePickerColumn
      {...props}
      {...columnProps}
      options={options}
      selectedValue={selected}
      onSelect={(value) => context.controller.selectHour(value, context.use12Hours)}
    />
  )
}
