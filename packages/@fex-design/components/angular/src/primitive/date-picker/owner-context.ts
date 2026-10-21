import { InjectionToken } from '@angular/core'
import type { DatePickerState } from './use-date-picker'
import type { RangePickerState } from './use-range-picker'

export const PickerOwnerToken = new InjectionToken<DatePickerState | RangePickerState>(
  'PickerOwner',
)
