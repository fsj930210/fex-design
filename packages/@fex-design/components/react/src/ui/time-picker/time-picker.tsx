import type { TimePickerClassNames, TimePickerStyles } from '@fex-design/core/time-picker/types'
import { cn } from '@fex-design/utils'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
  type TimePickerRootProps,
  type TimePickerTriggerProps,
} from '@fex-design/react/primitive/time-picker'

export interface TimePickerProps extends Omit<TimePickerRootProps, 'children'> {
  hourColumnProps?: Omit<ComponentProps<typeof TimePickerHourColumn>, 'children'> | undefined
  minuteColumnProps?: Omit<ComponentProps<typeof TimePickerMinuteColumn>, 'children'> | undefined
  secondColumnProps?: Omit<ComponentProps<typeof TimePickerSecondColumn>, 'children'> | undefined
  periodColumnProps?: Omit<ComponentProps<typeof TimePickerPeriodColumn>, 'children'> | undefined
  panelProps?: Omit<ComponentProps<typeof TimePickerPanel>, 'children'> | undefined
  contentProps?: Omit<ComponentProps<typeof TimePickerContent>, 'children'> | undefined
  classNames?: TimePickerClassNames | undefined
  styles?: TimePickerStyles<CSSProperties> | undefined
  className?: string | undefined
  style?: TimePickerTriggerProps['style'] | undefined
  size?: TimePickerTriggerProps['size'] | undefined
  variant?: TimePickerTriggerProps['variant'] | undefined
  placeholder?: string | undefined
  allowClear?: boolean | undefined
  invalid?: boolean | undefined
  'aria-invalid'?: ComponentProps<'div'>['aria-invalid']
  'data-warning'?: string | undefined
  prefix?: ReactNode | undefined
  suffix?: ReactNode | undefined
  inputProps?: TimePickerTriggerProps['inputProps'] | undefined
  step?:
    | { hour?: number | undefined; minute?: number | undefined; second?: number | undefined }
    | undefined
  triggerRender?: TimePickerTriggerProps['children'] | undefined
  panelRender?: ((panel: ReactNode) => ReactNode) | undefined
  footer?: ReactNode | undefined
}

export function TimePicker({
  panelProps,
  hourColumnProps,
  minuteColumnProps,
  secondColumnProps,
  periodColumnProps,
  contentProps,
  classNames,
  styles,
  className,
  style,
  size,
  variant,
  placeholder,
  allowClear,
  invalid,
  prefix,
  suffix,
  inputProps,
  step,
  triggerRender,
  panelRender,
  footer,
  'aria-invalid': ariaInvalid,
  'data-warning': dataWarning,
  ...options
}: TimePickerProps) {
  const columns = analyzeTimeFormat(
    options.format ?? (options.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'),
    options.use12Hours,
  ).columns
  const panel = (
    <TimePickerPanel
      {...panelProps}
      className={cn(classNames?.panel, panelProps?.className)}
      style={{ ...styles?.panel, ...panelProps?.style }}
    >
      {columns.map((column) => {
        if (column.unit === 'hour')
          return (
            <TimePickerHourColumn
              className={classNames?.column}
              style={styles?.column}
              itemClassName={classNames?.item}
              itemStyle={styles?.item}
              selectedItemClassName={classNames?.selectedItem}
              selectedItemStyle={styles?.selectedItem}
              key="hour"
              step={step?.hour}
              {...hourColumnProps}
            />
          )
        if (column.unit === 'minute')
          return (
            <TimePickerMinuteColumn
              className={classNames?.column}
              style={styles?.column}
              itemClassName={classNames?.item}
              itemStyle={styles?.item}
              selectedItemClassName={classNames?.selectedItem}
              selectedItemStyle={styles?.selectedItem}
              key="minute"
              step={step?.minute}
              {...minuteColumnProps}
            />
          )
        if (column.unit === 'second')
          return (
            <TimePickerSecondColumn
              className={classNames?.column}
              style={styles?.column}
              itemClassName={classNames?.item}
              itemStyle={styles?.item}
              selectedItemClassName={classNames?.selectedItem}
              selectedItemStyle={styles?.selectedItem}
              key="second"
              step={step?.second}
              {...secondColumnProps}
            />
          )
        return (
          <TimePickerPeriodColumn
            className={classNames?.column}
            style={styles?.column}
            itemClassName={classNames?.item}
            itemStyle={styles?.item}
            selectedItemClassName={classNames?.selectedItem}
            selectedItemStyle={styles?.selectedItem}
            key="period"
            {...periodColumnProps}
          />
        )
      })}
    </TimePickerPanel>
  )
  return (
    <TimePickerRoot {...options}>
      <TimePickerTrigger
        className={cn(classNames?.root, className)}
        style={{ ...styles?.root, ...style }}
        size={size}
        variant={variant}
        placeholder={placeholder}
        allowClear={allowClear}
        invalid={invalid}
        aria-invalid={ariaInvalid}
        data-warning={dataWarning}
        prefix={prefix}
        suffix={suffix}
        inputProps={{
          ...inputProps,
          className: cn(classNames?.input, inputProps?.className),
          style: { ...styles?.input, ...inputProps?.style },
        }}
      >
        {triggerRender}
      </TimePickerTrigger>
      <TimePickerPortal>
        <TimePickerContent
          {...contentProps}
          className={cn(classNames?.popup, contentProps?.className)}
          style={{ ...styles?.popup, ...contentProps?.style }}
        >
          {panelRender ? panelRender(panel) : panel}
          {footer}
        </TimePickerContent>
      </TimePickerPortal>
    </TimePickerRoot>
  )
}
