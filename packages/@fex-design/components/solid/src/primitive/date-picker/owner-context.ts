import { createContext } from 'solid-js'
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
export const PickerOwnerContext = createContext<PickerOwner>()
