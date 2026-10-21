import type { InputHTMLAttributes } from 'vue'
import type { TimePickerManagedInputProp } from '@fex-design/core/time-picker/input-props'

/** Native input extensions; editing configuration belongs to TimePickerRoot. */
export type TimePickerInputProps = Omit<InputHTMLAttributes, TimePickerManagedInputProp> & {
  [Key in TimePickerManagedInputProp]?: never
}
