import type { CalendarSemanticPart, CalendarSemanticValue } from '@fex-design/core/calendar'
export type CalendarStyles = CalendarSemanticValue<
  Partial<Record<CalendarSemanticPart, Record<string, string | number | null | undefined>>>
>
export type CalendarClassNames = CalendarSemanticValue<
  Partial<Record<CalendarSemanticPart, string>>
>
