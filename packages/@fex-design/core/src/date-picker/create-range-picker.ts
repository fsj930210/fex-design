import type { CalendarCell, CalendarDate, CalendarRange, CalendarValue } from '../calendar/types'
import { getCalendarNextPanel } from '../calendar/navigation'
import { getCalendarValueDate } from '../calendar/value'
import { createDatePickerDisabledDate } from './constraints'
import { definedPickerOptions, equalPickerValue, type PickerValueOptions } from './options'
import { createNextRangeValue, createRangePreviewValue, getRangeActivePart, getNextRangeActivePart, getRangeFromValue, normalizeDatePickerRange } from './range'
import { createPickerSession } from './session'
import { formatDatePickerValue, normalizeDatePickerValue } from './value'
import type { DatePickerInputPart, DatePickerDisabledDateInfo } from './types'
import { getRangePickerTriggerView } from './view'

export interface RangePickerOptions<TValue extends CalendarValue = CalendarValue> extends PickerValueOptions<CalendarRange<TValue>> {
  allowEmpty?: boolean | { start?: boolean; end?: boolean } | undefined
  order?: boolean | undefined
  disabledDate?: ((date: CalendarDate, info: DatePickerDisabledDateInfo<TValue>) => boolean) | undefined
}

export function normalizeRangeAllowEmpty(value: RangePickerOptions['allowEmpty']) {
  if (value === true) return { start: true, end: true }
  const parts: { start?: boolean; end?: boolean } = value && typeof value === 'object' ? value : {}
  return { start: Boolean(parts.start), end: Boolean(parts.end) }
}

export function equalRangePickerValue(left: CalendarRange, right: CalendarRange) {
  return equalPickerValue(left.start, right.start) && equalPickerValue(left.end, right.end)
}

export function createRangePicker<TValue extends CalendarValue = CalendarValue>(initialOptions: RangePickerOptions<TValue> = {}) {
  const session = createPickerSession<CalendarRange<TValue>, RangePickerOptions<TValue>>(definedPickerOptions(initialOptions), {
    empty: () => ({}),
    equal: equalRangePickerValue,
    first: value => value.start ?? value.end ?? null,
    activePart: getRangeActivePart,
    needConfirm: options => options.needConfirm ?? false,
  })
  // A range is one value: keep intermediate endpoints in the shared draft even without confirmation.
  const selection = () => session.getSnapshot().pendingValue
  const displayedSelection = () => {
    const snapshot = session.getSnapshot()
    return snapshot.open || session.getConfig().needConfirm ? selection() : snapshot.value
  }
  const orderedSelection = () => session.getOptions().order === false ? selection() : normalizeDatePickerRange(selection())
  function disabledDate(date: CalendarDate, part: DatePickerInputPart, rangeValue = selection()) {
    const options = session.getOptions()
    return createDatePickerDisabledDate<TValue>({
      ...session.getConfig(),
      panel: session.getSnapshot().panel,
      ...definedPickerOptions({ disabledDate: options.disabledDate }),
    })(date, { activePart: part, from: getRangeFromValue(rangeValue, part), rangeValue })
  }
  function valid(value: TValue, part: DatePickerInputPart, rangeValue = selection()) {
    // Constraint conversion is shared with Calendar-backed selection.
    return !disabledDate(getCalendarValueDate(value), part, rangeValue)
  }
  function select(value: TValue) {
    if (!session.mutable()) return
    const snapshot = session.getSnapshot()
    const config = session.getConfig()
    value = normalizeDatePickerValue(getCalendarValueDate(value), config.picker, config.weekStartsOn) as TValue
    if (!valid(value, snapshot.activePart)) return
    // Keep each draft value in the field the user selected; order only at submission.
    const next = createNextRangeValue(selection(), value, snapshot.activePart, false)
    session.setPending(next, snapshot.activePart)
    const completed = session.getSnapshot().completedParts
    const missingPart = getNextRangeActivePart(next)
    const allowEmpty = normalizeRangeAllowEmpty(session.getOptions().allowEmpty)
    const finished = completed.length === 2 || Boolean(missingPart && allowEmpty[missingPart])
    if (!config.needConfirm && finished && canConfirm()) { session.commit(orderedSelection()); session.close() }
    else {
      const part = getNextRangeActivePart(next, completed)
      if (part) session.setActivePart(part, true)
    }
  }
  function canConfirm() {
    const pending = orderedSelection()
    const allowEmpty = normalizeRangeAllowEmpty(session.getOptions().allowEmpty)
    return session.mutable() && Boolean(pending.start || pending.end) &&
      Boolean(pending.start || allowEmpty.start) && Boolean(pending.end || allowEmpty.end) &&
      (!pending.start || valid(pending.start, 'start', pending)) && (!pending.end || valid(pending.end, 'end', pending))
  }
  function confirm() {
    if (!canConfirm()) return
    session.commit(orderedSelection())
    session.close()
  }
  function clear() {
    if (!session.mutable()) return
    session.commit({})
    session.setActivePart('start')
  }
  function source(part: DatePickerInputPart) {
    return formatDatePickerValue(displayedSelection()[part], session.getConfig())
  }
  function text(part: DatePickerInputPart) {
    const snapshot = session.getSnapshot()
    const previewValue = snapshot.open && snapshot.activePart === part ? snapshot.hoverValue ?? snapshot.previewValue : null
    return previewValue ? formatDatePickerValue(previewValue, session.getConfig()) : source(part)
  }
  function previewCell(cell: CalendarCell) {
    const config = session.getConfig()
    if (!session.getSnapshot().open || !session.mutable() || cell.state.disabled || !getCalendarNextPanel(cell.panel, config.picker)) return
    const value = normalizeDatePickerValue(getCalendarValueDate(cell.value), config.picker, config.weekStartsOn) as TValue
    if (valid(value, session.getSnapshot().activePart)) session.setPreviewValue(value)
  }
  function setHoverValue(value: CalendarValue | null) {
    const config = session.getConfig()
    const next = value ? normalizeDatePickerValue(getCalendarValueDate(value), config.picker, config.weekStartsOn) as TValue : null
    session.setHoverValue(next && session.getSnapshot().open && session.mutable() && valid(next, session.getSnapshot().activePart) ? next : null)
  }
  function getState() {
    const snapshot = session.getSnapshot()
    const rangeValue = displayedSelection()
    const order = session.getOptions().order ?? true
    return {
      ...session.getConfig(),
      open: snapshot.open,
      panel: snapshot.panel,
      viewDate: snapshot.viewDate,
      activePart: snapshot.activePart,
      focusRequest: snapshot.focusRequest,
      triggerView: getRangePickerTriggerView(snapshot),
      hoverValue: snapshot.hoverValue as TValue | null,
      previewValue: snapshot.previewValue as TValue | null,
      rangeValue,
      committedValue: snapshot.value,
      pendingValue: snapshot.pendingValue,
      allowEmpty: normalizeRangeAllowEmpty(session.getOptions().allowEmpty),
      order,
      displayRange: createRangePreviewValue(rangeValue, snapshot.hoverValue as TValue | null, snapshot.activePart, order),
      startText: text('start'),
      endText: text('end'),
      canClear: session.getConfig().clearable && session.mutable() && Boolean(rangeValue.start || rangeValue.end),
      canConfirm: canConfirm(),
      disabledDate,
    }
  }
  return {
    getState,
    getSnapshot: session.getSnapshot,
    subscribe: session.subscribe,
    setOptions: session.setOptions,
    setOpen: session.setOpen,
    setPanel: session.setPanel,
    setViewDate: session.setViewDate,
    setActivePart: (part: DatePickerInputPart) => session.setActivePart(part),
    setHoverValue,
    previewCell,
    openPanel: (part?: DatePickerInputPart) => session.setOpen(true, part),
    close: session.close,
    today: session.today,
    cancel: session.close,
    clear,
    confirm,
    select,
  }
}

export type RangePickerController<TValue extends CalendarValue = CalendarValue> = ReturnType<typeof createRangePicker<TValue>>
export type RangePickerState<TValue extends CalendarValue = CalendarValue> = ReturnType<RangePickerController<TValue>['getState']>
