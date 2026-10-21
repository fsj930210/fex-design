import { inject, type ComputedRef, type InjectionKey } from 'vue'
import type { useTimeRangePicker } from './use-time-range-picker'
import type { TimeRangePickerOptions } from '@fex-design/core/time-picker/range-types'
export interface TimeRangePickerContext extends ReturnType<typeof useTimeRangePicker> {
  options: ComputedRef<TimeRangePickerOptions>
}
export const timeRangePickerContextKey: InjectionKey<TimeRangePickerContext> =
  Symbol('TimeRangePicker')
export function useTimeRangePickerContext() {
  const context = inject(timeRangePickerContextKey)
  if (!context) throw new Error('TimeRangePicker parts require TimeRangePickerRoot.')
  return context
}
