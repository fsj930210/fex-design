import { createContext, use } from 'react'
import type { createDropdown } from '@fex-design/core/dropdown/create-dropdown'

export interface DropdownContextValue {
  controller: ReturnType<typeof createDropdown>
  triggerId: string
  disabled: boolean
}
export const DropdownContext = createContext<DropdownContextValue | null>(null)
export function useDropdownContext() {
  const value = use(DropdownContext)
  if (!value) throw new Error('Dropdown parts require DropdownRoot')
  return value
}
