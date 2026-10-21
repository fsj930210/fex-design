import { createMinuteOptions, resolveDisabledTime } from '@fex-design/core/time-picker/options'
import { TimePickerColumn } from './time-picker-column'
import { useTimePickerContext } from './time-picker-context'
import type { TimePickerNumericColumnProps } from './column.types'

export function TimePickerMinuteColumn({
  step,
  columnProps,
  isItemDisabled,
  ...props
}: TimePickerNumericColumnProps) {
  const context = useTimePickerContext('TimePickerMinuteColumn')
  const disabled = resolveDisabledTime(context.disabledTime, context.snapshot.value).minutes
  const options = createMinuteOptions(step, disabled).map((option) => ({
    ...option,
    disabled: option.disabled || Boolean(isItemDisabled?.(option.value)),
  }))
  return (
    <TimePickerColumn
      {...props}
      {...columnProps}
      options={options}
      selectedValue={context.snapshot.value?.minute}
      onSelect={context.controller.selectMinute}
    />
  )
}
