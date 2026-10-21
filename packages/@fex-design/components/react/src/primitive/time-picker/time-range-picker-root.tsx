import type { ReactNode } from 'react'
import type { TimeRangePickerOptions } from '@fex-design/core/time-picker/range-types'
import type { TimePickerPopoverOptions } from '@fex-design/core/time-picker/types'
import { TimePickerRoot } from './time-picker-root'
import { useTimeRangePicker } from './use-time-range-picker'
import { TimeRangePickerContext } from './time-range-picker-context'

export interface TimeRangePickerRootProps extends TimeRangePickerOptions {
  popoverProps?: TimePickerPopoverOptions | undefined
  children?: ReactNode | undefined
}
export function TimeRangePickerRoot(props: TimeRangePickerRootProps) {
  const range = useTimeRangePicker(props)
  const snapshot = () => range.snapshot
  return (
    <TimeRangePickerContext value={{ ...range, options: props }}>
      <TimePickerRoot
        value={snapshot().draft[snapshot().activePart === 'start' ? 0 : 1]}
        open={snapshot().open}
        format={props.format}
        use12Hours={props.use12Hours}
        disabled={props.disabled}
        readOnly={props.readOnly}
        disabledTime={props.disabledTime}
        popoverProps={props.popoverProps}
        onChange={(value, details) => range.controller.select(value, details.reason)}
        onOpenChange={range.controller.setOpen}
      >
        {props.children}
      </TimePickerRoot>
    </TimeRangePickerContext>
  )
}
