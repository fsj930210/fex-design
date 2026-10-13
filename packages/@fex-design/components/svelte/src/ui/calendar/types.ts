import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { CalendarRenderContext, CalendarCellRenderContext, CalendarSemanticPart, CalendarSemanticValue } from '@fex-design/core/calendar'
export interface CalendarAppearance {
  headerRender?: false | Snippet<[CalendarRenderContext]> | undefined
  cellRender?: Snippet<[CalendarCellRenderContext]> | undefined
  fullCellRender?: Snippet<[CalendarCellRenderContext]> | undefined
  footerRender?: Snippet<[CalendarRenderContext]> | undefined
  classNames?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, string>>> | undefined
  styles?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, HTMLAttributes<HTMLDivElement>['style']>>> | undefined
}
