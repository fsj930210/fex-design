import { getContext } from 'svelte'
import type { useTimeRangePicker } from './use-time-range-picker.svelte'
import type { TimeRangePickerOptions } from '@fex-design/core/time-picker/range-types'
export const timeRangePickerContextKey = Symbol('TimeRangePicker')
export interface TimeRangePickerContext extends ReturnType<typeof useTimeRangePicker> {
  options: () => TimeRangePickerOptions
}
export function getTimeRangePickerContext() {
  const context = getContext<TimeRangePickerContext | undefined>(timeRangePickerContextKey)
  if (!context) throw new Error('TimeRangePicker parts require TimeRangePickerRoot.')
  return context
}
