import { splitProps, type JSX } from 'solid-js'
import { getCalendarUIOptions, type CalendarUIOptions, type CalendarRenderContext, type CalendarCellRenderContext, type CalendarSemanticPart, type CalendarSemanticValue } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { CalendarRoot } from '../../primitive/calendar'
import { CalendarContent } from './calendar-content'
export type CalendarProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'onSelect'> & CalendarUIOptions & {
  headerRender?: false | ((context: CalendarRenderContext) => JSX.Element) | undefined
  cellRender?: ((context: CalendarCellRenderContext) => JSX.Element) | undefined
  fullCellRender?: ((context: CalendarCellRenderContext) => JSX.Element) | undefined
  footerRender?: ((context: CalendarRenderContext) => JSX.Element) | undefined
  classNames?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, string>>> | undefined
  styles?: CalendarSemanticValue<Partial<Record<CalendarSemanticPart, JSX.CSSProperties>>> | undefined
}
export function Calendar(props: CalendarProps) {
  const [options, remaining] = splitProps(props, ["value","defaultValue","values","range","viewDate","defaultViewDate","panel","defaultPanel","min","max","today","disabledDate","weekStartsOn","onChange","onSelect","onPanelChange","onViewDateChange","onCellSelect","onCellHover","fullscreen","showWeek","locale"])
  const [local, attrs] = splitProps(remaining, ['headerRender', 'cellRender', 'fullCellRender', 'footerRender', 'classNames', 'styles', 'class'])
  return <CalendarRoot {...attrs} {...getCalendarUIOptions(options)} class={cn(calendarUIRootClassName, local.class)} data-fullscreen={options.fullscreen !== false}>
    <CalendarContent options={options} headerRender={local.headerRender} cellRender={local.cellRender} fullCellRender={local.fullCellRender} footerRender={local.footerRender} classNames={local.classNames} styles={local.styles} />
  </CalendarRoot>
}
