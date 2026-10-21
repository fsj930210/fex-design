import { getContext } from 'svelte'
import type { PickerAppearance } from './appearance.types'
export const pickerAppearanceKey = Symbol('PickerAppearance')
export function usePickerAppearance(): () => PickerAppearance {
  return getContext<() => PickerAppearance>(pickerAppearanceKey) ?? (() => ({}))
}
