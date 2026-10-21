import { getCalendarUIView, resolveCalendarSemanticValue } from '@fex-design/core/calendar'
import {
  calendarUIClasses,
  calendarUIFullCellClassName,
  calendarUIMiniCellClassName,
  calendarUIFullTriggerClassName,
  calendarUIMiniTriggerClassName,
  calendarUIWeekRowClassName,
  calendarUIDateRowClassName,
  calendarUIMonthRowClassName,
} from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import {
  CalendarHeader,
  CalendarWeekHeader,
  CalendarRow,
  CalendarCell,
  CalendarCellTrigger,
  CalendarFooter,
} from '../../primitive/calendar'
import { useCalendarContext } from '../../primitive/calendar/calendar-context'
import type { CalendarProps } from './calendar'
import type { CalendarUIOptions, CalendarSemanticPart } from '@fex-design/core/calendar'
type Props = Pick<
  CalendarProps,
  | 'headerProps'
  | 'headerRender'
  | 'cellRender'
  | 'fullCellRender'
  | 'footerRender'
  | 'classNames'
  | 'styles'
> & { options: CalendarUIOptions }
export function CalendarContent(props: Props) {
  const calendar = useCalendarContext('Calendar')
  const context = { state: calendar.state, controller: calendar.controller }
  const view = getCalendarUIView(context, props.options)
  const appearance = {
    classNames: resolveCalendarSemanticValue(props.classNames, context),
    styles: resolveCalendarSemanticValue(props.styles, context),
  }
  const cls = (part: CalendarSemanticPart) =>
    cn(calendarUIClasses[part], appearance.classNames?.[part])
  const columns = view.showWeek
    ? calendarUIWeekRowClassName
    : context.state.panel === 'date'
      ? calendarUIDateRowClassName
      : calendarUIMonthRowClassName
  return (
    <>
      {props.headerRender !== false && (
        <CalendarHeader
          {...props.headerProps}
          className={cn(cls('header'), props.headerProps?.className)}
          style={{ ...appearance.styles?.header, ...props.headerProps?.style }}
        >
          {props.headerRender?.(context)}
        </CalendarHeader>
      )}
      {context.state.panel === 'date' && (
        <div
          className={cn(calendarUIClasses.weekHeader, columns, appearance.classNames?.weekHeader)}
          style={appearance.styles?.weekHeader}
          data-slot="calendar-week-header"
        >
          {view.showWeek && (
            <div className={cls('weekNumber')} style={appearance.styles?.weekNumber}>
              {view.locale.week}
            </div>
          )}
          <CalendarWeekHeader labels={view.locale.weekdays} className="contents py-0" />
        </div>
      )}
      <div
        role="grid"
        data-slot="calendar-grid"
        data-panel={context.state.panel}
        className={cls('grid')}
        style={appearance.styles?.grid}
        onMouseLeave={calendar.controller.clearHoveredRow}
      >
        {view.rows.map((row) => (
          <CalendarRow
            key={row.key}
            className={cn(calendarUIClasses.row, columns, appearance.classNames?.row)}
            style={appearance.styles?.row}
          >
            {view.showWeek && (
              <div
                role="rowheader"
                data-slot="calendar-week-number"
                className={cls('weekNumber')}
                style={appearance.styles?.weekNumber}
              >
                {row.week.week}
              </div>
            )}
            {row.cells.map((cell) => (
              <CalendarCell
                key={cell.key}
                cell={cell}
                className={cn(
                  view.fullscreen ? calendarUIFullCellClassName : calendarUIMiniCellClassName,
                  cls('cell'),
                )}
                style={appearance.styles?.cell}
              >
                {props.fullCellRender ? (
                  props.fullCellRender({ ...context, cell })
                ) : (
                  <>
                    <CalendarCellTrigger
                      cell={cell}
                      className={cn(
                        view.fullscreen
                          ? calendarUIFullTriggerClassName
                          : calendarUIMiniTriggerClassName,
                        cls('cellTrigger'),
                      )}
                      style={appearance.styles?.cellTrigger}
                    >
                      {view.label(cell)}
                    </CalendarCellTrigger>
                    {props.cellRender && (
                      <div
                        data-slot="calendar-cell-content"
                        className={cls('cellContent')}
                        style={appearance.styles?.cellContent}
                      >
                        {props.cellRender({ ...context, cell })}
                      </div>
                    )}
                  </>
                )}
              </CalendarCell>
            ))}
          </CalendarRow>
        ))}
      </div>
      {props.footerRender && (
        <CalendarFooter className={cls('footer')} style={appearance.styles?.footer}>
          {props.footerRender(context)}
        </CalendarFooter>
      )}
    </>
  )
}
