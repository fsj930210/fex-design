import type { StyleValue } from 'vue'
import type { CalendarSemanticPart, CalendarSemanticValue } from '@fex-design/core/calendar'
export interface CalendarAppearance {
  classNames?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, string>>> | undefined
  styles?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, StyleValue>>> | undefined
}
