export const calendarCellClassName =
  'min-h-8 rounded-md text-sm hover:bg-[var(--calendar-hover-background,var(--muted-background))] data-[disabled=true]:hover:bg-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-disabled-foreground data-[outside=true]:text-placeholder-foreground data-[today=true]:relative data-[today=true]:z-10 data-[today=true]:[box-shadow:inset_0_0_0_1px_var(--calendar-today-color,var(--primary))] data-[in-range=true]:rounded-none data-[in-range=true]:bg-[color-mix(in_srgb,var(--calendar-selected-background,var(--primary))_10%,transparent)] data-[range-start=true]:!rounded-l-md data-[range-start=true]:!rounded-r-none data-[range-start=true]:bg-[var(--calendar-selected-background,var(--primary))] data-[range-start=true]:text-[var(--calendar-selected-foreground,var(--primary-foreground))] data-[range-end=true]:!rounded-l-none data-[range-end=true]:!rounded-r-md data-[range-end=true]:bg-[var(--calendar-selected-background,var(--primary))] data-[range-end=true]:text-[var(--calendar-selected-foreground,var(--primary-foreground))] data-[range-start=true]:data-[range-end=true]:!rounded-md data-[week-hover=true]:rounded-none data-[week-hover=true]:!bg-[var(--calendar-selected-background,var(--primary))] data-[week-hover=true]:!text-[var(--calendar-selected-foreground,var(--primary-foreground))] data-[week-row-start=true]:data-[week-hover=true]:!rounded-l-md data-[week-row-start=true]:data-[week-hover=true]:!rounded-r-none data-[week-row-end=true]:data-[week-hover=true]:!rounded-l-none data-[week-row-end=true]:data-[week-hover=true]:!rounded-r-md data-[week-selected=true]:rounded-none data-[week-selected=true]:!bg-[var(--calendar-selected-background,var(--primary))] data-[week-selected=true]:!text-[var(--calendar-selected-foreground,var(--primary-foreground))] data-[week-start=true]:!rounded-l-md data-[week-start=true]:!rounded-r-none data-[week-end=true]:!rounded-l-none data-[week-end=true]:!rounded-r-md data-[selected=true]:bg-[var(--calendar-selected-background,var(--primary))] data-[selected=true]:text-[var(--calendar-selected-foreground,var(--primary-foreground))] data-[outside=true]:data-[today=true]:[box-shadow:none] data-[today=true]:data-[week-hover=true]:[box-shadow:none] data-[today=true]:data-[week-selected=true]:[box-shadow:none] data-[outside=true]:data-[in-range=true]:!bg-transparent data-[outside=true]:data-[range-start=true]:!bg-transparent data-[outside=true]:data-[range-start=true]:!text-placeholder-foreground data-[outside=true]:data-[range-end=true]:!bg-transparent data-[outside=true]:data-[range-end=true]:!text-placeholder-foreground data-[outside=true]:data-[selected=true]:!bg-transparent data-[outside=true]:data-[selected=true]:!text-placeholder-foreground'

export const calendarWeekRangeCellClassName =
  'data-[week-in-range=true]:rounded-none data-[week-in-range=true]:bg-[color-mix(in_srgb,var(--calendar-selected-background,var(--primary))_10%,transparent)] data-[week-range-start=true]:rounded-none data-[week-range-start=true]:!bg-[var(--calendar-selected-background,var(--primary))] data-[week-range-start=true]:!text-[var(--calendar-selected-foreground,var(--primary-foreground))] data-[week-range-end=true]:rounded-none data-[week-range-end=true]:!bg-[var(--calendar-selected-background,var(--primary))] data-[week-range-end=true]:!text-[var(--calendar-selected-foreground,var(--primary-foreground))] data-[week-range-single=true]:rounded-none data-[week-range-single=true]:!bg-[var(--calendar-selected-background,var(--primary))] data-[week-range-single=true]:!text-[var(--calendar-selected-foreground,var(--primary-foreground))] data-[week-row-start=true]:data-[week-range-start=true]:!rounded-l-md data-[week-row-end=true]:data-[week-range-start=true]:!rounded-r-md data-[week-row-start=true]:data-[week-range-end=true]:!rounded-l-md data-[week-row-end=true]:data-[week-range-end=true]:!rounded-r-md data-[week-row-start=true]:data-[week-range-single=true]:!rounded-l-md data-[week-row-end=true]:data-[week-range-single=true]:!rounded-r-md data-[today=true]:data-[week-range=true]:!ring-0 data-[range-picker=true]:data-[outside=true]:data-[week-range=true]:!bg-transparent data-[range-picker=true]:data-[outside=true]:data-[week-range=true]:!text-placeholder-foreground data-[range-picker=true]:data-[outside=true]:data-[week-hover=true]:!bg-transparent data-[range-picker=true]:data-[outside=true]:data-[week-hover=true]:!text-placeholder-foreground'

export const calendarRootClassName = 'block w-full min-w-72 overflow-hidden rounded-md border border-border bg-elevated-background text-elevated-foreground'
export const calendarHeaderClassName = 'flex flex-wrap items-center justify-end gap-2 p-3'
export const calendarHeaderControlsClassName = 'flex flex-wrap items-center gap-2'
export const calendarHeaderSelectClassName = 'w-auto min-w-16 rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary'
export const calendarFooterClassName = 'flex items-center justify-end gap-2 border-t border-border p-3'
export const calendarGridClassName = 'grid gap-0 p-0'
export const calendarDateColumnsClassName = 'grid-cols-7'
export const calendarWeekColumnsClassName = 'grid-cols-[2.5rem_repeat(7,minmax(0,1fr))]'
export const calendarMonthColumnsClassName = 'grid-cols-4'
export const calendarWeekNumberClassName = 'flex h-8 items-center justify-center text-xs text-muted-foreground'
export const calendarRowClassName = 'grid grid-cols-7 gap-0 data-[panel=month]:grid-cols-4 data-[panel=quarter]:grid-cols-4 data-[panel=year]:grid-cols-4 data-[panel=decade]:grid-cols-4'
export const calendarWeekHeaderClassName = `grid ${calendarDateColumnsClassName} py-2 text-center text-xs text-muted-foreground`
export const calendarCellContainerClassName = 'relative min-h-8 min-w-0 flex min-w-0 flex-col'
export const calendarCellTriggerClassName = 'relative cursor-pointer disabled:cursor-not-allowed flex h-8 min-h-8 w-full items-center justify-center rounded-md focus-visible:z-10 focus-visible:outline-none focus-visible:[box-shadow:inset_0_0_0_2px_var(--primary)]'
export const calendarNavigationButtonClassName = 'inline-flex size-8 items-center justify-center rounded-md text-base font-semibold hover:bg-[var(--calendar-hover-background,var(--muted-background))] disabled:cursor-not-allowed disabled:text-disabled-foreground'
export const calendarPanelTriggerClassName = 'rounded-md px-2 py-1 font-medium hover:bg-[var(--calendar-hover-background,var(--muted-background))]'

export const calendarUIRootClassName = 'w-full rounded-md border border-border overflow-hidden'
export const calendarUIClasses = {
  header: 'flex flex-wrap items-center justify-end gap-2 p-3',
  weekHeader: 'grid min-h-8 items-center text-center text-xs text-muted-foreground py-0',
  weekNumber: calendarWeekNumberClassName,
  grid: 'grid p-0 gap-0', row: 'grid gap-0',
  cell: 'min-w-0', cellTrigger: 'rounded-md',
  cellContent: 'min-w-0 overflow-auto text-sm',
  footer: 'flex items-center justify-end gap-2 p-3 border-t border-border',
}
export const calendarUIFullCellClassName = 'flex min-w-0 flex-col rounded-none border-t border-border p-1 data-[selected=true]:bg-[var(--calendar-selected-background,color-mix(in_srgb,var(--primary)_10%,transparent))] data-[selected=true]:text-[var(--calendar-selected-foreground,var(--foreground))]'
export const calendarUIMiniCellClassName = 'flex min-h-8 flex-col'
export const calendarUIFullTriggerClassName = 'h-8 min-h-8 w-full shrink-0 justify-center px-1'
export const calendarUIMiniTriggerClassName = 'min-h-8 flex-1'
export const calendarUIControlsClassName = 'flex flex-wrap items-center gap-2'
export const calendarUISelectClassName = 'rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary'
export const calendarUIWeekRowClassName = calendarWeekColumnsClassName
export const calendarUIDateRowClassName = calendarDateColumnsClassName
export const calendarUIMonthRowClassName = calendarMonthColumnsClassName
