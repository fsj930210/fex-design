import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import type { ReactNode } from 'react'
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn, type TimePickerRootProps, type TimePickerTriggerProps } from '@fex-design/react/primitive/time-picker'

export interface TimePickerProps extends Omit<TimePickerRootProps, 'children'> {
  className?: string | undefined
  style?: TimePickerTriggerProps['style'] | undefined
  size?: TimePickerTriggerProps['size'] | undefined
  variant?: TimePickerTriggerProps['variant'] | undefined
  placeholder?: string | undefined
  allowClear?: boolean | undefined
  invalid?: boolean | undefined
  prefix?: ReactNode | undefined
  suffix?: ReactNode | undefined
  inputProps?: TimePickerTriggerProps['inputProps'] | undefined
  step?: { hour?: number | undefined; minute?: number | undefined; second?: number | undefined } | undefined
  triggerRender?: TimePickerTriggerProps['children'] | undefined
  panelRender?: ((panel: ReactNode) => ReactNode) | undefined
  footer?: ReactNode | undefined
}

export function TimePicker({ className, style, size, variant, placeholder, allowClear, invalid, prefix, suffix, inputProps, step, triggerRender, panelRender, footer, ...options }: TimePickerProps) {
  const columns = analyzeTimeFormat(options.format ?? (options.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'), options.use12Hours).columns
  const panel = <TimePickerPanel>{columns.map(column => {
    if (column.unit === 'hour') return <TimePickerHourColumn key="hour" step={step?.hour} />
    if (column.unit === 'minute') return <TimePickerMinuteColumn key="minute" step={step?.minute} />
    if (column.unit === 'second') return <TimePickerSecondColumn key="second" step={step?.second} />
    return <TimePickerPeriodColumn key="period" />
  })}</TimePickerPanel>
  return <TimePickerRoot {...options}>
    <TimePickerTrigger className={className} style={style} size={size} variant={variant} placeholder={placeholder} allowClear={allowClear} invalid={invalid} prefix={prefix} suffix={suffix} inputProps={inputProps}>{triggerRender}</TimePickerTrigger>
    <TimePickerPortal><TimePickerContent>{panelRender ? panelRender(panel) : panel}{footer}</TimePickerContent></TimePickerPortal>
  </TimePickerRoot>
}
