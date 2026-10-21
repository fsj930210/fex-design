import type { InputAttributes } from '../input'
import type { TimePickerManagedInputProp } from '@fex-design/core/time-picker/input-props'

/** Native input extensions; editing configuration belongs to TimePickerRoot. */
// Omit over the native attribute index signature drops its explicitly typed keys.
// Restore the supported native fields so class/style and listeners stay precise.
export type TimePickerInputProps = Omit<InputAttributes, TimePickerManagedInputProp> &
  Pick<
    InputAttributes,
    | 'class'
    | 'style'
    | 'onClick'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
    | 'onKeyUp'
    | 'onPointerDown'
    | 'onPointerUp'
    | 'onMouseLeave'
  > & {
    [Key in TimePickerManagedInputProp]?: never
  }
