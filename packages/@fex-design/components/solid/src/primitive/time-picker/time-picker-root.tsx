import { useTimePicker } from './use-time-picker'
import type {
  DisabledTime,
  TimePickerChangeDetails,
  TimeValue,
} from '@fex-design/core/time-picker/types'
import { splitProps, type ParentProps } from 'solid-js'
import { Popover, type PopoverProps } from '../popover'
import { TimePickerContext } from './time-picker-context'

export interface TimePickerRootProps extends Omit<PopoverProps, 'children'>, ParentProps {
  value?: TimeValue | null | undefined
  defaultValue?: TimeValue | null | undefined
  popoverProps?: import('@fex-design/core/time-picker/types').TimePickerPopoverOptions | undefined
  format?: string | undefined
  onChange?: ((value: TimeValue | null, details: TimePickerChangeDetails) => void) | undefined
  use12Hours?: boolean | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  disabledTime?: DisabledTime | undefined
}

export function TimePickerRoot(props: TimePickerRootProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'popoverProps',
    'format',
    'use12Hours',
    'disabled',
    'readOnly',
    'disabledTime',
    'children',
  ])
  const { controller, snapshot } = useTimePicker(() => ({
    value: local.value, defaultValue: local.defaultValue,
    format: local.format, use12Hours: local.use12Hours,
    disabled: local.disabled, readOnly: local.readOnly, disabledTime: local.disabledTime,
    onChange: (value, details) => local.onChange?.(value, details),
  }))
  return (
    <Popover {...rest} {...local.popoverProps} disabled={local.disabled} trigger={['focus', 'click']}>
      <TimePickerContext.Provider
        value={{
          controller,
          snapshot,
          format: () => local.format ?? (local.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'),
          use12Hours: () => local.use12Hours ?? false,
          disabled: () => local.disabled ?? false,
          readOnly: () => local.readOnly ?? false,
          disabledTime: () => local.disabledTime,
        }}
      >
        {local.children}
      </TimePickerContext.Provider>
    </Popover>
  )
}
