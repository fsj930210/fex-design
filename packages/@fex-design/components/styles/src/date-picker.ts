import { tagClassName, tagActionClassName } from './tag'

export const datePickerContentClassName =
  'min-w-[min(var(--floating-reference-width,0px),720px,var(--floating-available-width,calc(100vw-16px)))] max-w-[min(720px,var(--floating-available-width,calc(100vw-16px)))] overflow-hidden p-0 max-[480px]:overflow-x-hidden max-[480px]:overflow-y-auto'

export const datePickerTriggerClassName = 'w-full min-w-0 max-w-full cursor-pointer has-[[data-slot=date-picker-tags]]:h-auto has-[[data-slot=date-picker-tags]]:min-h-(--input-height)'

export const datePickerInputPreviewClassName = 'text-[var(--input-placeholder-color,var(--placeholder-foreground))]'

export const datePickerRangeTriggerClassName = 'w-full min-w-0 max-w-full cursor-pointer gap-0'

export const datePickerRangeFieldClassName = 'flex min-w-0 flex-1 items-stretch gap-2'

// The outer Input owns padding; endpoint Input roots and controls add none.
export const datePickerRangeInputClassName =
  'relative h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 shadow-none focus-within:border-0 focus-within:ring-0 data-[active=true]:after:absolute data-[active=true]:after:inset-x-0 data-[active=true]:after:bottom-0 data-[active=true]:after:h-0.5 data-[active=true]:after:bg-primary'

export const datePickerRangeInputControlClassName = 'w-full min-w-0 flex-1 p-0 text-start'

export const datePickerRangeSeparatorClassName =
  'inline-flex shrink-0 self-center items-center justify-center px-2 text-muted-foreground rtl:data-[default-separator=true]:rotate-180'

// Keep both affordances mounted in one slot; only an available clear action replaces the suffix.
export const datePickerAffixClassName = [
  'grid min-w-[max(var(--input-icon-size),var(--input-clear-icon-size))] shrink-0 place-items-center [&>[data-slot=input-suffix]]:col-start-1 [&>[data-slot=input-suffix]]:row-start-1',
  '[&>[data-slot=input-clear]]:col-start-1 [&>[data-slot=input-clear]]:row-start-1',
  'has-[[data-slot=input-clear]]:group-hover/input-root:[&>[data-slot=input-suffix]]:invisible',
  'has-[[data-slot=input-clear]]:group-focus-within/input-root:[&>[data-slot=input-suffix]]:invisible',
].join(' ')

export const datePickerMultipleTagsClassName =
  'flex min-w-0 flex-1 flex-wrap items-center self-center gap-1'

/** @deprecated Use the Tag primitive. */
export const datePickerTagClassName = tagClassName({ size: 'sm' })
/** @deprecated Use the Tag primitive. */
export const datePickerTagRemoveClassName = tagActionClassName
/** @deprecated Use the Tag primitive. */
export const datePickerTagOverflowClassName = tagClassName({ size: 'sm' })

export const datePickerMultipleInputClassName = 'w-6 min-w-6 flex-none px-0 caret-foreground'

export const datePickerPanelClassName =
  'block min-w-72 rounded-none border-0 bg-[var(--popover-background,var(--elevated-background))] text-[var(--popover-foreground,var(--elevated-foreground))]'

export const datePickerDateTimePanelClassName = [
  '[&_[data-slot=calendar-week-header]]:!h-8',
  '[&_[data-slot=calendar-week-header]]:!py-0',
  '[&_[data-slot=calendar-week-head]]:flex',
  '[&_[data-slot=calendar-week-head]]:h-8',
  '[&_[data-slot=calendar-week-head]]:items-center',
  '[&_[data-slot=calendar-week-head]]:justify-center',
  '[&_[data-slot=calendar-week-head]]:!py-0',
  '[&_[data-slot=calendar-grid]]:!px-3',
  '[&_[data-slot=calendar-grid]]:!py-0',
].join(' ')

// Prefer two standard panels, then shrink within the available popup width.
// Gaps and descendant selectors also cover Angular's display:contents part hosts.
export const datePickerPanelsClassName = [
  'flex w-max max-w-full gap-px bg-border',
  '[&_[data-slot=calendar-root]]:w-72 [&_[data-slot=calendar-root]]:min-w-0 [&_[data-slot=calendar-root]]:flex-auto',
  'max-[480px]:flex-col max-[480px]:[&_[data-slot=calendar-root]]:w-full',
].join(' ')

export const datePickerHeaderClassName =
  'flex h-12 items-center justify-between border-b border-border px-3'

export const datePickerHeaderSideClassName = 'flex items-center gap-1'

export const datePickerHeaderNavigationClassName =
  'inline-flex size-7 border-0 bg-transparent p-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted-background hover:text-foreground'

export const datePickerHeaderTitleClassName = 'flex items-center gap-2 text-base font-semibold'

export const datePickerHeaderLabelClassName =
  'cursor-pointer border-0 bg-transparent rounded-md px-1 !text-base font-semibold text-foreground transition-colors hover:bg-muted-background data-[hovered=true]:bg-muted-background'

export const datePickerWeekHeaderClassName =
  'grid grid-cols-7 px-3 py-2 text-center text-xs text-muted-foreground [&>[data-slot=calendar-week-head]]:py-1'

export const datePickerGridClassName = [
  'grid gap-0 p-3',
  'data-[panel=month]:min-h-48 data-[panel=month]:grid-rows-3',
  'data-[panel=quarter]:py-4',
  'data-[panel=year]:min-h-48 data-[panel=year]:grid-rows-3',
  'data-[panel=decade]:min-h-48 data-[panel=decade]:grid-rows-3',
].join(' ')
export function getDatePickerRowClassName(panel: string) {
  return panel === 'date' ? 'grid grid-cols-7 gap-0' : 'grid grid-cols-4 gap-0 items-center'
}
export function getDatePickerCellClassName(panel: string) {
  return panel === 'date' ? undefined : 'h-10'
}

export { calendarCellClassName as datePickerCellClassName } from './calendar'

export const datePickerFooterClassName =
  'flex items-center justify-end gap-2 border-t border-border p-2 empty:hidden'

export const datePickerConfirmClassName =
  'rounded-md px-3 py-1 text-sm'

export const datePickerCancelClassName = 'rounded-md border border-border px-3 py-1 text-sm'

export const datePickerTodayClassName =
  'rounded-md px-2 py-1 text-sm text-primary hover:bg-muted-background'

export const datePickerPresetClassName =
  'h-auto w-full cursor-pointer justify-start rounded-md border-0 bg-transparent px-2 py-1.5 text-start text-sm text-foreground shadow-none hover:bg-muted-background data-[selected=true]:bg-muted-background data-[selected=true]:font-medium'
