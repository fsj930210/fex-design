import { inject, InjectionToken } from '@angular/core'
import type { Signal } from '@angular/core'
import type { PickerAppearance } from './appearance.types'
export const PickerAppearanceToken = new InjectionToken<Signal<PickerAppearance>>('PickerAppearance')
export function getPickerAppearance(): () => PickerAppearance { return inject(PickerAppearanceToken, { optional: true }) ?? (() => ({})) }
