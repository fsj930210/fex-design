import { inject, type InjectionKey } from 'vue'
import type { PickerAppearance } from './appearance.types'
export const pickerAppearanceKey: InjectionKey<() => PickerAppearance> = Symbol('PickerAppearance')
export function usePickerAppearance(): () => PickerAppearance {
  return inject(pickerAppearanceKey, () => ({}))
}
