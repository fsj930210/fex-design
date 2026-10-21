import { createContext, useContext } from 'solid-js'
import type { useTimeRangePicker } from './use-time-range-picker'
import type { TimeRangePickerOptions } from '@fex-design/core/time-picker/range-types'

export interface TimeRangePickerContextValue extends ReturnType<typeof useTimeRangePicker> {
  options: TimeRangePickerOptions
}
export const TimeRangePickerContext = createContext<TimeRangePickerContextValue>()
export function useTimeRangePickerContext() {
  const context = useContext(TimeRangePickerContext)
  if (!context) throw new Error('TimeRangePicker parts require TimeRangePickerRoot.')
  return context
}
