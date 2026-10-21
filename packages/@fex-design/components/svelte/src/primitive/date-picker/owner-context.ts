import type { DatePickerContextValue } from './context'

export type PickerOwner = Pick<
  DatePickerContextValue,
  | 'footerView'
  | 'picker'
  | 'getCanConfirm'
  | 'setPanel'
  | 'setViewDate'
  | 'setHoverValue'
  | 'close'
  | 'clear'
  | 'confirm'
  | 'cancel'
  | 'today'
>
export const pickerOwnerKey = Symbol('PickerOwner')
