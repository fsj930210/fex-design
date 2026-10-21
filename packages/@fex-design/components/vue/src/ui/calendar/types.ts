import type { CalendarHeader } from '../../primitive/calendar'
import type { StyleValue } from 'vue'
import type { CalendarSemanticPart, CalendarSemanticValue } from '@fex-design/core/calendar'
export interface CalendarAppearance {
  headerProps?: InstanceType<typeof CalendarHeader>['$props'] | undefined
  classNames?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, string>>> | undefined
  styles?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, StyleValue>>> | undefined
}
