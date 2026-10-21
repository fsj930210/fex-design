import type { CalendarPanel, CalendarValue } from '../calendar/types'
import type { DatePickerInputPart } from './types'

interface TriggerState {
  multiple: boolean
  calendarValues: readonly unknown[]
  open: boolean
  hoverValue: CalendarValue | null
}

/** Rendering decisions belong to the primitive contract, not individual templates. */
export function getDatePickerTriggerView(state: TriggerState) {
  const hasTags = state.multiple && state.calendarValues.length > 0
  return {
    showTags: hasTags,
    hasTags,
    preview: state.open && !state.multiple && state.hoverValue !== null,
  }
}

export function getRangePickerTriggerView(state: {
  open: boolean
  hoverValue: CalendarValue | null
  activePart: DatePickerInputPart
}) {
  const preview = state.open && state.hoverValue !== null
  return {
    startPreview: preview && state.activePart === 'start',
    endPreview: preview && state.activePart === 'end',
  }
}

export function getDatePickerPanelView(panel: CalendarPanel) {
  return { showMonthNavigation: panel === 'date', showWeekHeader: panel === 'date' }
}

export function getDatePickerFooterView(needConfirm: boolean) {
  return { showToday: true, showCancel: needConfirm, showConfirm: needConfirm }
}

export function getPickerContentKind(content: unknown) {
  return content === undefined ? 'default' : content === null ? 'hidden' : 'custom'
}

export function getRangePickerInputPlaceholder(
  part: DatePickerInputPart,
  placeholder?: string | null,
) {
  return placeholder ?? (part === 'start' ? '开始日期' : '结束日期')
}

export function getRangePickerSeparator<T>(separator: T | undefined | null): T | string {
  return separator ?? '→'
}

export function getDatePickerInputPart(
  value: string | undefined | null,
): DatePickerInputPart | undefined {
  return value === 'start' || value === 'end' ? value : undefined
}

export function isPickerContentProvided(value: unknown) {
  return value !== undefined && value !== null
}

export function isPickerActionBlocked(event: {
  defaultPrevented: boolean
  currentTarget: EventTarget | null
}) {
  const target = event.currentTarget
  return event.defaultPrevented || Boolean(target && 'disabled' in target && target.disabled)
}
