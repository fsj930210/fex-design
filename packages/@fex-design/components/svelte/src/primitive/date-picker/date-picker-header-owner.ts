import { pickerOwnerKey, type PickerOwner } from './owner-context'
import { getContext } from 'svelte'
import {
  datePickerContextKey,
  rangePickerContextKey,
  type DatePickerContextValue,
  type RangePickerContextValue,
} from './context'

export function useHeaderOwner(
  component: string,
): PickerOwner {
  const datePicker = getContext<DatePickerContextValue | undefined>(datePickerContextKey)
  const rangePicker = getContext<RangePickerContextValue | undefined>(rangePickerContextKey)
  const owner = getContext<PickerOwner | undefined>(pickerOwnerKey) ?? datePicker ?? rangePicker
  if (!owner) throw new Error(`${component} must be used within DatePickerRoot or RangePickerRoot`)
  return owner
}
