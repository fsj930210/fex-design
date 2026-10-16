import type { InjectionKey } from 'vue'
import type { PopoverContextValue } from '../popover/context'

export const pickerContainerKey: InjectionKey<{ parentPopover: PopoverContextValue | null }> = Symbol('PickerContainer')
