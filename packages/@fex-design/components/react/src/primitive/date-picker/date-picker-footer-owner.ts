import { PickerOwnerContext } from './owner-context'
import { use } from 'react'
import { DatePickerContext, RangePickerContext } from './context'

export function useFooterOwner() {
  const datePicker = use(DatePickerContext)
  const rangePicker = use(RangePickerContext)
  const context = use(PickerOwnerContext) ?? datePicker ?? rangePicker
  if (!context)
    throw new Error('DatePickerFooter must be used within DatePickerRoot or RangePickerRoot')
  return context
}
