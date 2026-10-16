import { createSecondOptions, resolveDisabledTime } from '@fex-design/core/time-picker/options'
import { TimePickerColumn } from './time-picker-column'
import { useTimePickerContext } from './time-picker-context'
import type { TimePickerNumericColumnProps } from './column.types'

export function TimePickerSecondColumn({
  step,
  isItemDisabled,
  ...props
}: TimePickerNumericColumnProps) {
  const context = useTimePickerContext('TimePickerSecondColumn')
  const disabled = resolveDisabledTime(context.disabledTime, context.snapshot.value).seconds
  const options = createSecondOptions(step, disabled).map((option) => ({
    ...option,
    disabled: option.disabled || Boolean(isItemDisabled?.(option.value)),
  }))
  return (
    <TimePickerColumn
      {...props}
      options={options}
      selectedValue={context.snapshot.value?.second}
      onSelect={context.controller.selectSecond}
    />
  )
}
