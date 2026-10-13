import { For, createMemo, createRenderEffect } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { getCalendarUIView, resolveCalendarSemanticValue } from '@fex-design/core/calendar'
import { calendarUIClasses, calendarUIFullCellClassName, calendarUIMiniCellClassName, calendarUIFullTriggerClassName, calendarUIMiniTriggerClassName, calendarUIWeekRowClassName, calendarUIDateRowClassName, calendarUIMonthRowClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { CalendarHeader, CalendarWeekHeader, CalendarRow, CalendarCell, CalendarCellTrigger, CalendarFooter } from '../../primitive/calendar'
import { useCalendarContext } from '../../primitive/calendar/calendar-context'
import type { CalendarProps } from './calendar'
import type { CalendarUIOptions, CalendarSemanticPart } from '@fex-design/core/calendar'
type Props = Pick<CalendarProps, 'headerRender' | 'cellRender' | 'fullCellRender' | 'footerRender' | 'classNames' | 'styles'> & { options: CalendarUIOptions }
export function CalendarContent(props: Props) {
  const calendar = useCalendarContext('Calendar')
  const context = () => ({ state: calendar.state(), controller: calendar.controller })
  const view = createMemo(() => getCalendarUIView(context(), props.options))
  const [model, setModel] = createStore<{ rows: ReturnType<typeof getCalendarUIView>['rows'] }>({ rows: [] })
  // Synchronize only the render model; keyed proxies preserve DOM across core updates.
  createRenderEffect(() => setModel('rows', reconcile(view().rows.map(row => ({ ...row, week: { ...row.week }, cells: row.cells.map(cell => ({ ...cell, state: { ...cell.state } })) })), { key: 'key' })))
  const appearance = createMemo(() => ({ classNames: resolveCalendarSemanticValue(props.classNames, context()), styles: resolveCalendarSemanticValue(props.styles, context()) }))
  const cls = (part: CalendarSemanticPart) => cn(calendarUIClasses[part], appearance().classNames?.[part])
  const columns = () => view().showWeek ? calendarUIWeekRowClassName : context().state.panel === 'date' ? calendarUIDateRowClassName : calendarUIMonthRowClassName
  return <>
    {props.headerRender !== false && <CalendarHeader class={cls('header')} style={appearance().styles?.header}>{props.headerRender?.(context())}</CalendarHeader>}
    {context().state.panel === 'date' && <div class={cn(calendarUIClasses.weekHeader, columns(), appearance().classNames?.weekHeader)} style={appearance().styles?.weekHeader} data-slot="calendar-week-header">
      {view().showWeek && <div class={cls('weekNumber')} style={appearance().styles?.weekNumber}>{view().locale.week}</div>}
      <CalendarWeekHeader labels={view().locale.weekdays} class="contents py-0" />
    </div>}
    <div role="grid" data-slot="calendar-grid" data-panel={context().state.panel} class={cls('grid')} style={appearance().styles?.grid} onMouseLeave={calendar.controller.clearHoveredRow}>
      {<For each={model.rows}>{row => <CalendarRow class={cn(calendarUIClasses.row, columns(), appearance().classNames?.row)} style={appearance().styles?.row}>
        {view().showWeek && <div role="rowheader" data-slot="calendar-week-number" class={cls('weekNumber')} style={appearance().styles?.weekNumber}>{row.week.week}</div>}
        {<For each={row.cells}>{cell => <CalendarCell cell={cell} class={cn(view().fullscreen ? calendarUIFullCellClassName : calendarUIMiniCellClassName, cls('cell'))} style={appearance().styles?.cell}>
          {props.fullCellRender ? props.fullCellRender({ ...context(), cell }) : <>
            <CalendarCellTrigger cell={cell} class={cn(view().fullscreen ? calendarUIFullTriggerClassName : calendarUIMiniTriggerClassName, cls('cellTrigger'))} style={appearance().styles?.cellTrigger}>{view().label(cell)}</CalendarCellTrigger>
            {props.cellRender && <div data-slot="calendar-cell-content" class={cls('cellContent')} style={appearance().styles?.cellContent}>{props.cellRender({ ...context(), cell })}</div>}
          </>}
        </CalendarCell>}</For>}
      </CalendarRow>}</For>}
    </div>
    {props.footerRender && <CalendarFooter class={cls('footer')} style={appearance().styles?.footer}>{props.footerRender(context())}</CalendarFooter>}
  </>
}
