import { use, type ComponentProps } from 'react'
import { cn } from '@fex-design/utils'
import { getDatePickerTimeColumns } from '@fex-design/core/date-picker/time'
import { datePickerTimePanelClassName } from '@fex-design/components-styles/date-picker'
import {
  TimePickerRoot,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
} from '@fex-design/react/primitive/time-picker'
import { DatePickerContext, RangePickerContext } from './context'

export interface DatePickerTimePanelProps extends ComponentProps<'div'> {
  range?: boolean | undefined
}
export function DatePickerTimePanel({
  range = false,
  className,
  ...props
}: DatePickerTimePanelProps) {
  const single = use(DatePickerContext)
  const interval = use(RangePickerContext)
  const owner = range ? interval : single
  if (!owner) throw new Error('DatePickerTimePanel requires the matching picker root.')
  if (!owner.showTime) return null
  const options = owner.timeOptions
  return (
    <div
      {...props}
      data-slot="date-picker-time-panel"
      className={cn(datePickerTimePanelClassName, className)}
    >
      <TimePickerRoot
        value={owner.timeValue}
        format={options.format}
        use12Hours={options.use12Hours}
        disabled={owner.disabled}
        disabledTime={options.disabledTime}
        onChange={owner.selectTime}
      >
        <TimePickerPanel>
          {getDatePickerTimeColumns(options).map((column) => {
            if (column.unit === 'hour')
              return <TimePickerHourColumn key="hour" step={options.step?.hour} />
            if (column.unit === 'minute')
              return <TimePickerMinuteColumn key="minute" step={options.step?.minute} />
            if (column.unit === 'second')
              return <TimePickerSecondColumn key="second" step={options.step?.second} />
            return <TimePickerPeriodColumn key="period" />
          })}
        </TimePickerPanel>
      </TimePickerRoot>
    </div>
  )
}
