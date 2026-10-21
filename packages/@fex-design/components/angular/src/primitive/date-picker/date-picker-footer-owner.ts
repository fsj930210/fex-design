import { PickerOwnerToken } from './owner-context'
import { inject } from '@angular/core'
import { DatePickerState } from './use-date-picker'
import { RangePickerState } from './use-range-picker'
export function getFooterOwner() {
  const owner =
    inject(PickerOwnerToken, { optional: true }) ??
    inject(DatePickerState, { optional: true }) ??
    inject(RangePickerState, { optional: true })
  if (!owner) throw new Error('DatePicker part requires DatePickerRoot or RangePickerRoot')
  return owner
}
