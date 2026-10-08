import { useTimePickerContext } from './time-picker-context'

export function useTimePicker() {
  return useTimePickerContext('useTimePicker')
}
