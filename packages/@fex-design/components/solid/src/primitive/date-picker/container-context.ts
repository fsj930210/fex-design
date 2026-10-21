import { createContext } from 'solid-js'
import type { PopoverContextValue } from '../popover/popover-context'

export const PickerContainerContext = createContext<{
  parentPopover: PopoverContextValue | undefined
}>()
