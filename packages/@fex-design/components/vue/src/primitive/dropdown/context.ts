import { inject, type InjectionKey } from 'vue'
import type { createDropdown } from '@fex-design/core/dropdown/create-dropdown'
export interface DropdownContextValue {
  controller: ReturnType<typeof createDropdown>
  triggerId: string
  readonly disabled: boolean
}
export const dropdownKey: InjectionKey<DropdownContextValue> = Symbol('Dropdown')
export function useDropdownContext() {
  const context = inject(dropdownKey)
  if (!context) throw new Error('Dropdown parts require DropdownRoot')
  return context
}
