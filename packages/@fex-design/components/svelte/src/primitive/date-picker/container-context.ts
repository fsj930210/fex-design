import type { PopoverContext } from '../popover/popover-context'

export interface PickerContainerScope { parentPopover: PopoverContext | undefined }
export const pickerContainerKey = Symbol('PickerContainer')
