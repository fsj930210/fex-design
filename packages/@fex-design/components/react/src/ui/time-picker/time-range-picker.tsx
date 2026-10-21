import type { TimePickerProps } from './time-picker'
import type { ComponentProps } from 'react'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import {
  TimeRangePickerRoot,
  TimeRangePickerTrigger,
  TimeRangePickerFooter,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
  type TimeRangePickerRootProps,
  type TimeRangePickerTriggerProps,
} from '@fex-design/react/primitive/time-picker'

export type TimeRangePickerProps = Omit<TimeRangePickerRootProps, 'children'> &
  TimeRangePickerTriggerProps &
  Pick<
    TimePickerProps,
    | 'contentProps'
    | 'panelProps'
    | 'hourColumnProps'
    | 'minuteColumnProps'
    | 'secondColumnProps'
    | 'periodColumnProps'
  > & {
    footerProps?: ComponentProps<typeof TimeRangePickerFooter> | undefined
    step?: { hour?: number; minute?: number; second?: number } | undefined
  }
export function TimeRangePicker({
  contentProps,
  panelProps,
  hourColumnProps,
  minuteColumnProps,
  secondColumnProps,
  periodColumnProps,
  footerProps,
  ...props
}: TimeRangePickerProps) {
  const columns = analyzeTimeFormat(
    props.format ?? (props.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'),
    props.use12Hours,
  ).columns
  return (
    <TimeRangePickerRoot {...props}>
      <TimeRangePickerTrigger {...props} />
      <TimePickerPortal>
        <TimePickerContent {...contentProps}>
          <TimePickerPanel {...panelProps}>
            {columns.map((column) => {
              if (column.unit === 'hour')
                return (
                  <TimePickerHourColumn key="hour" step={props.step?.hour} {...hourColumnProps} />
                )
              if (column.unit === 'minute')
                return (
                  <TimePickerMinuteColumn
                    key="minute"
                    step={props.step?.minute}
                    {...minuteColumnProps}
                  />
                )
              if (column.unit === 'second')
                return (
                  <TimePickerSecondColumn
                    key="second"
                    step={props.step?.second}
                    {...secondColumnProps}
                  />
                )
              return <TimePickerPeriodColumn key="period" {...periodColumnProps} />
            })}
          </TimePickerPanel>
          <TimeRangePickerFooter {...footerProps} />
        </TimePickerContent>
      </TimePickerPortal>
    </TimeRangePickerRoot>
  )
}
