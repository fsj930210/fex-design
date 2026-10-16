import type { DatePickerOptions } from '@fex-design/core/date-picker/create-date-picker'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import type { PickerAppearance } from '../../primitive/date-picker/appearance.types'
import type { DatePickerFooterContent } from '@fex-design/vue/primitive/date-picker'
export interface DatePickerProps extends DatePickerOptions, Omit<PickerAppearance, 'startInputProps' | 'endInputProps'> {
  size?: InputSize | undefined
  variant?: InputVariant | undefined
  placeholder?: string | undefined
  footer?: DatePickerFooterContent
}
