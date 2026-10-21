import { createContext, use } from 'react'
import type { PickerAppearance } from './appearance.types'
export const PickerAppearanceContext = createContext<PickerAppearance>({})
export function usePickerAppearance() {
  return use(PickerAppearanceContext)
}
