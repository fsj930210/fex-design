import { createTimePickerController } from '@fex-design/core/time-picker/create-time-picker-controller'
import type {
  DisabledTime,
  TimePickerChangeDetails,
  TimeValue,
} from '@fex-design/core/time-picker/types'
import { createEffect, splitProps, type ParentProps } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { Popover, type PopoverProps } from '../popover'
import { TimePickerContext } from './time-picker-context'

export interface TimePickerRootProps extends Omit<PopoverProps, 'children'>, ParentProps {
  value?: TimeValue | null | undefined
  defaultValue?: TimeValue | null | undefined
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
    'format',
    'use12Hours',
    'disabled',
    'readOnly',
    'disabledTime',
    'children',
  ])
  const controller = createTimePickerController({
    value: local.value,
    defaultValue: local.defaultValue,
    onChange: (value, details) => local.onChange?.(value, details),
  })
  const snapshot = createCoreStoreSignal(controller)
  createEffect(() => {
    if (local.value !== undefined) controller.setControlledValue(local.value)
  })
  return (
    <Popover {...rest} trigger={['focus', 'click']}>
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
