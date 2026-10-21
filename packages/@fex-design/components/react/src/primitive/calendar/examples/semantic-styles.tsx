import {
  CalendarRoot,
  CalendarHeader,
  CalendarWeekHeader,
  CalendarGrid,
  CalendarCell,
  CalendarCellTrigger,
  CalendarFooter,
} from '@fex-design/react/primitive/calendar'
import { getCalendarUIOptions, getCalendarUILocale } from '@fex-design/core/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
const options = getCalendarUIOptions({
  defaultViewDate: calendarDemoDate,
  defaultValue: calendarDemoDate,
})
const locale = getCalendarUILocale({})
const headerProps = {
  yearSelectTriggerProps: { className: 'border-violet-300 bg-white text-violet-800 rounded-md' },
  monthSelectTriggerProps: { className: 'border-violet-300 bg-white text-violet-800 rounded-md' },
  yearSelectContentProps: {
    className:
      'border-violet-300 bg-white text-violet-800 [--primary:#6d28d9] [--muted-background:#f5f3ff]',
  },
  monthSelectContentProps: {
    className:
      'border-violet-300 bg-white text-violet-800 [--primary:#6d28d9] [--muted-background:#f5f3ff]',
  },
}
export function CalendarSemanticStylesExample() {
  return (
    <CalendarRoot
      {...options}
      className="w-full rounded-md border border-border overflow-hidden [&:not([data-panel=date])>[data-slot=calendar-week-header]]:hidden "
      data-fullscreen={true}
    >
      <CalendarHeader {...headerProps} className="bg-muted-background" />
      <CalendarWeekHeader
        labels={locale.weekdays}
        className="grid min-h-8 items-center text-center text-xs text-muted-foreground py-0"
      />
      <CalendarGrid>
        {(cell) => (
          <CalendarCell
            cell={cell}
            className="flex min-w-0 flex-col rounded-none border-t border-border p-1 data-[selected=true]:bg-[var(--calendar-selected-background,color-mix(in_srgb,var(--primary)_10%,transparent))] data-[selected=true]:text-[var(--calendar-selected-foreground,var(--foreground))] bg-muted-background/20 data-[today=true]:!bg-success/20 data-[selected=true]:!bg-primary/20"
          >
            <CalendarCellTrigger
              cell={cell}
              className="h-8 min-h-8 w-full shrink-0 justify-center px-1 rounded-md"
            >
              {cell.panel === 'month'
                ? (locale.months[cell.date.month - 1] ?? cell.label)
                : cell.label}
            </CalendarCellTrigger>
          </CalendarCell>
        )}
      </CalendarGrid>
      <CalendarFooter style={{ borderTop: '2px solid var(--primary)' }}>
        <span>语义区域样式</span>
      </CalendarFooter>
    </CalendarRoot>
  )
}
