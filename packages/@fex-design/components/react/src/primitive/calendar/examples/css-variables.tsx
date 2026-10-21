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
const options = getCalendarUIOptions({ defaultViewDate: calendarDemoDate })
const locale = getCalendarUILocale({})
const headerProps = {
  yearSelectTriggerProps: {
    className:
      '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
  },
  monthSelectTriggerProps: {
    className:
      '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
  },
  yearSelectContentProps: {
    className:
      '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
  },
  monthSelectContentProps: {
    className:
      '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
  },
}
export function CalendarCssVariablesExample() {
  return (
    <CalendarRoot
      {...options}
      className="w-full rounded-md border border-border overflow-hidden [&:not([data-panel=date])>[data-slot=calendar-week-header]]:hidden [--calendar-hover-background:var(--success)] [--calendar-selected-background:var(--primary)] [--calendar-selected-foreground:var(--primary-foreground)] [--calendar-today-color:var(--danger)]"
      data-fullscreen={true}
    >
      <CalendarHeader {...headerProps} className="" />
      <CalendarWeekHeader
        labels={locale.weekdays}
        className="grid min-h-8 items-center text-center text-xs text-muted-foreground py-0"
      />
      <CalendarGrid>
        {(cell) => (
          <CalendarCell
            cell={cell}
            className="flex min-w-0 flex-col rounded-none border-t border-border p-1 data-[selected=true]:bg-[var(--calendar-selected-background,color-mix(in_srgb,var(--primary)_10%,transparent))] data-[selected=true]:text-[var(--calendar-selected-foreground,var(--foreground))]"
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
    </CalendarRoot>
  )
}
