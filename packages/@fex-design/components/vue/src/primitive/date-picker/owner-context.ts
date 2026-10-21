import type { InjectionKey } from 'vue'
import type { DatePickerContextValue } from './context'

type PickerOwner = Pick<
  DatePickerContextValue,
  | 'footerView'
  | 'picker'
  | 'canConfirm'
  | 'setPanel'
  | 'setViewDate'
  | 'setHoverValue'
  | 'close'
  | 'clear'
  | 'confirm'
  | 'cancel'
  | 'today'
>
export const pickerOwnerKey: InjectionKey<PickerOwner> = Symbol('PickerOwner')
