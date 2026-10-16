import type { InputHTMLAttributes } from 'vue'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import type { TimePickerControllerOptions, TimePickerPopoverOptions } from '@fex-design/core/time-picker/types'

export interface TimePickerProps extends Omit<TimePickerControllerOptions, 'onChange'> {
  popoverProps?: TimePickerPopoverOptions | undefined
  inputProps?: Omit<InputHTMLAttributes, 'value' | 'defaultValue'> | undefined
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  allowClear?: boolean | undefined
  placeholder?: string | undefined
  invalid?: boolean | undefined
  size?: InputSize | undefined
  variant?: InputVariant | undefined
  step?: { hour?: number | undefined; minute?: number | undefined; second?: number | undefined } | undefined
}
