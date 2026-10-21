import { createPeriodOptions, getDisplayedPeriod } from '@fex-design/core/time-picker/options'
import type { TimePeriod } from '@fex-design/core/time-picker/types'
import { TimePickerColumn } from './time-picker-column'
import { useTimePickerContext } from './time-picker-context'
import type { TimePickerPeriodColumnProps } from './column.types'

export function TimePickerPeriodColumn({
  labels,
  columnProps,
  isItemDisabled,
  ...props
}: TimePickerPeriodColumnProps) {
  const context = useTimePickerContext('TimePickerPeriodColumn')
  if (!context.use12Hours) return null
  const options = createPeriodOptions(labels).map((option) => ({
    ...option,
    disabled: option.disabled || Boolean(isItemDisabled?.(option.value)),
  }))
  const selected = context.snapshot.value ? getDisplayedPeriod(context.snapshot.value) : undefined
  return (
    <TimePickerColumn
      {...props}
      {...columnProps}
      options={options}
      selectedValue={selected}
      onSelect={context.controller.selectPeriod}
    />
  )
}
