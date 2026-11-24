import { createContext, useContext } from 'solid-js'
import type { createDropdown } from '@fex-design/core/dropdown/create-dropdown'
export interface DropdownContextValue {
  controller: ReturnType<typeof createDropdown>
  triggerId: string
  readonly disabled: boolean
}
export const DropdownContext = createContext<DropdownContextValue>()
export function useDropdownContext() {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('Dropdown parts require DropdownRoot')
  return context
}
