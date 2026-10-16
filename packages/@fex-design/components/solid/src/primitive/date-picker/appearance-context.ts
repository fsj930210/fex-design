import { createContext, useContext, type Accessor } from 'solid-js'
import type { PickerAppearance } from './appearance.types'
export const PickerAppearanceContext = createContext<Accessor<PickerAppearance>>(() => ({}))
export function usePickerAppearance(): () => PickerAppearance { return useContext(PickerAppearanceContext) }
