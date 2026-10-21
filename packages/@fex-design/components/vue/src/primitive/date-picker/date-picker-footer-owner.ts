import { inject } from 'vue'
import { pickerOwnerKey } from './owner-context'
import { datePickerContextKey, rangePickerContextKey } from './context'
export function createDatePickerFooterActions() {
  const owner =
    inject(pickerOwnerKey, null) ??
    inject(datePickerContextKey, null) ??
    inject(rangePickerContextKey, null)
  if (!owner) throw new Error('DatePicker footer action requires a picker Root')
  return owner
}
