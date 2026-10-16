import { PickerOwnerContext } from './owner-context'
import { use } from 'react'
import { DatePickerContext, RangePickerContext } from './context'

export function useHeaderOwner() {
  const datePicker = use(DatePickerContext)
  const rangePicker = use(RangePickerContext)
  const context = use(PickerOwnerContext) ?? datePicker ?? rangePicker
  if (!context)
    throw new Error('DatePickerHeader must be used within DatePickerRoot or RangePickerRoot')
  return context
}
