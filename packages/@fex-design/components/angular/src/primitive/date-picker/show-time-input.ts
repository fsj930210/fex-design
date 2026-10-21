import type { DatePickerShowTime } from '@fex-design/core/date-picker/types'
import { optionalPickerBoolean } from './boolean-input'

export function showTimeInput(
  value: boolean | string | DatePickerShowTime | null | undefined,
): boolean | DatePickerShowTime | undefined {
  return value !== null && typeof value === 'object' ? value : optionalPickerBoolean(value)
}
