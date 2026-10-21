import { getContext } from 'svelte'
import { pickerOwnerKey, type PickerOwner } from './owner-context'
import {
  datePickerContextKey,
  rangePickerContextKey,
  type DatePickerContextValue,
  type RangePickerContextValue,
} from './context'
export function useFooterOwner() {
  const owner =
    getContext<PickerOwner | undefined>(pickerOwnerKey) ??
    getContext<DatePickerContextValue | undefined>(datePickerContextKey) ??
    getContext<RangePickerContextValue | undefined>(rangePickerContextKey)
  if (!owner) throw new Error('DatePicker footer action requires a picker Root')
  return owner
}
