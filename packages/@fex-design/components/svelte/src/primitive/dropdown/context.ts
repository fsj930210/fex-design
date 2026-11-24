import { getContext } from 'svelte'
import type { createDropdown } from '@fex-design/core/dropdown/create-dropdown'
export interface DropdownContext {
  controller: ReturnType<typeof createDropdown>
  triggerId: string
  readonly disabled: boolean
}
export const dropdownKey = Symbol('Dropdown')
export function getDropdownContext() {
  const context = getContext<DropdownContext | undefined>(dropdownKey)
  if (!context) throw new Error('Dropdown parts require DropdownRoot')
  return context
}
