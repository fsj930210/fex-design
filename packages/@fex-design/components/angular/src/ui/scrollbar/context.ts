import { InjectionToken, type Signal } from '@angular/core'
import type { ScrollbarPart } from '@fex-design/core/scrollbar/types'

export type ScrollbarStyle = string | Readonly<Record<string, string | number | null | undefined>>
export const scrollbarAppearance = new InjectionToken<{
  classNames: Signal<Partial<Record<ScrollbarPart, string>> | undefined>
  styles: Signal<Partial<Record<ScrollbarPart, ScrollbarStyle>> | undefined>
}>('Scrollbar appearance')
