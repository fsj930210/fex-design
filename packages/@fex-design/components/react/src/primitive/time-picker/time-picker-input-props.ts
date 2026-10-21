import type { ComponentProps } from 'react'
import type { TimePickerManagedInputProp } from '@fex-design/core/time-picker/input-props'

/** Native input extensions; editing configuration belongs to TimePickerRoot. */
export type TimePickerInputProps = Omit<ComponentProps<'input'>, TimePickerManagedInputProp> & {
  [Key in TimePickerManagedInputProp]?: never
}
