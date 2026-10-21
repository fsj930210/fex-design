import type { HTMLInputAttributes } from 'svelte/elements'
import type { TimePickerManagedInputProp } from '@fex-design/core/time-picker/input-props'

/** Native input extensions; editing configuration belongs to TimePickerRoot. */
export type TimePickerInputProps = Omit<HTMLInputAttributes, TimePickerManagedInputProp> & {
  [Key in TimePickerManagedInputProp]?: never
}
