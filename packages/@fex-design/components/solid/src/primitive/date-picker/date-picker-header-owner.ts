import { PickerOwnerContext } from './owner-context'
import { useContext } from 'solid-js'
import { DatePickerContext, RangePickerContext } from './context'

export function useHeaderOwner() {
  const datePicker = useContext(DatePickerContext)
  const rangePicker = useContext(RangePickerContext)
  const context = useContext(PickerOwnerContext) ?? datePicker ?? rangePicker
  if (!context) throw new Error('DatePicker part requires DatePickerRoot or RangePickerRoot')
  return context
}
