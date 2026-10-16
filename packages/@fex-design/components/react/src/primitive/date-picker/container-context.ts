import { createContext } from 'react'
import type { PopoverContextValue } from '../popover/popover-context'

export const PickerContainerContext = createContext<{ parentPopover: PopoverContextValue | null } | null>(null)
