import type { JSX } from 'solid-js'
import type { TimePickerManagedInputProp } from '@fex-design/core/time-picker/input-props'

/** Native input extensions; editing configuration belongs to TimePickerRoot. */
export type TimePickerInputProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  TimePickerManagedInputProp
> & {
  [Key in TimePickerManagedInputProp]?: never
}
