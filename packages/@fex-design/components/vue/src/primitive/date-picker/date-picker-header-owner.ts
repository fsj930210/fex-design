import { pickerOwnerKey } from './owner-context'
import { inject } from 'vue'
import { datePickerContextKey, rangePickerContextKey } from './context'

export function useHeaderOwner(component: string) {
  const datePicker = inject(datePickerContextKey, null)
  const rangePicker = inject(rangePickerContextKey, null)
  const owner = inject(pickerOwnerKey, null) ?? datePicker ?? rangePicker
  if (!owner) throw new Error(`${component} must be used within DatePickerRoot or RangePickerRoot`)
  return owner
}
