import type { RangePickerOptions } from '@fex-design/core/date-picker/create-range-picker'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import type { PickerAppearance } from '../../primitive/date-picker/appearance.types'
import type { DatePickerFooterContent } from '@fex-design/vue/primitive/date-picker'
export interface RangePickerProps extends RangePickerOptions, PickerAppearance {
  size?: InputSize | undefined
  variant?: InputVariant | undefined
  startPlaceholder?: string | undefined
  endPlaceholder?: string | undefined
  separator?: string | undefined
  footer?: DatePickerFooterContent
}
