import {
  hasDatePickerTime,
  mergeDatePickerDate,
  mergeDatePickerTime,
  getDatePickerTimeValue,
  getDatePickerDefaultTime,
  isDatePickerTimeDisabled,
} from './time'
import type { TimeValue } from '../time-picker/types'
import type { CalendarCell, CalendarDate, CalendarRange, CalendarValue } from '../calendar/types'
import { getCalendarNextPanel } from '../calendar/navigation'
import { getCalendarValueDate } from '../calendar/value'
import { createDatePickerDisabledDate } from './constraints'
import { definedPickerOptions, equalPickerValue, type PickerValueOptions } from './options'
import {
  createNextRangeValue,
  createRangePreviewValue,
  getRangeActivePart,
  getNextRangeActivePart,
  getRangeFromValue,
  normalizeDatePickerRange,
} from './range'
import { createPickerSession } from './session'
import { formatDatePickerValue, normalizeDatePickerValue } from './value'
import type { DatePickerInputPart, DatePickerDisabledDateInfo } from './types'
import { getRangePickerTriggerView } from './view'

export interface RangePickerOptions<
  TValue extends CalendarValue = CalendarValue,
> extends PickerValueOptions<CalendarRange<TValue>> {
  allowEmpty?: boolean | { start?: boolean; end?: boolean } | undefined
  order?: boolean | undefined
  disabledDate?:
    | ((date: CalendarDate, info: DatePickerDisabledDateInfo<TValue>) => boolean)
    | undefined
}

export function normalizeRangeAllowEmpty(value: RangePickerOptions['allowEmpty']) {
  if (value === true) return { start: true, end: true }
  const parts: { start?: boolean; end?: boolean } = value && typeof value === 'object' ? value : {}
  return { start: Boolean(parts.start), end: Boolean(parts.end) }
}

export function equalRangePickerValue(left: CalendarRange, right: CalendarRange) {
  return equalPickerValue(left.start, right.start) && equalPickerValue(left.end, right.end)
}

export function createRangePicker<TValue extends CalendarValue = CalendarValue>(
  initialOptions: RangePickerOptions<TValue> = {},
) {
  const session = createPickerSession<CalendarRange<TValue>, RangePickerOptions<TValue>>(
    definedPickerOptions(initialOptions),
    {
      normalize: (value, options) =>
        hasDatePickerTime(options)
          ? {
              ...(value.start
                ? {
                    start: mergeDatePickerDate(
                      value.start,
                      value.start,
                      options,
                      'start',
                    ) as CalendarValue as TValue,
                  }
                : {}),
              ...(value.end
                ? {
                    end: mergeDatePickerDate(
                      value.end,
                      value.end,
                      options,
                      'end',
                    ) as CalendarValue as TValue,
                  }
                : {}),
            }
          : value,
      empty: () => ({}),
      equal: equalRangePickerValue,
      first: (value, part) => (part ? (value[part] ?? null) : (value.start ?? value.end ?? null)),
      activePart: getRangeActivePart,
      needConfirm: (options) => options.needConfirm ?? hasDatePickerTime(options),
    },
  )
  // A range is one value: keep intermediate endpoints in the shared draft even without confirmation.
  const selection = () => session.getSnapshot().pendingValue
  const displayedSelection = () => {
    const snapshot = session.getSnapshot()
    return snapshot.open || session.getConfig().needConfirm ? selection() : snapshot.value
  }
  const orderedSelection = () =>
    session.getOptions().order === false ? selection() : normalizeDatePickerRange(selection())
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
    return (
      !disabledDate(getCalendarValueDate(value), part, rangeValue) &&
      !isDatePickerTimeDisabled(
        value,
        session.getOptions(),
        part,
        getRangeFromValue(rangeValue, part),
      )
    )
  }
  function select(value: TValue) {
    if (!session.mutable()) return
    const snapshot = session.getSnapshot()
    const config = session.getConfig()
    value = (config.showTime
      ? mergeDatePickerDate(
          value,
          selection()[snapshot.activePart],
          session.getOptions(),
          snapshot.activePart,
        )
      : normalizeDatePickerValue(
          getCalendarValueDate(value),
          config.picker,
          config.weekStartsOn,
        )) as CalendarValue as TValue
    if (
      config.showTime && config.needConfirm
        ? disabledDate(getCalendarValueDate(value), snapshot.activePart)
        : !valid(value, snapshot.activePart)
    )
      return
    // Keep each draft value in the field the user selected; order only at submission.
    const next = createNextRangeValue(selection(), value, snapshot.activePart, false)
    if (config.showTime) {
      session.setPending(next, undefined, snapshot.activePart)
      if (!config.needConfirm && completeRange()) session.commit(orderedSelection())
      return
    }
    session.setPending(next, snapshot.activePart)
    const completed = session.getSnapshot().completedParts
    const missingPart = getNextRangeActivePart(next)
    const allowEmpty = normalizeRangeAllowEmpty(session.getOptions().allowEmpty)
    const finished = completed.length === 2 || Boolean(missingPart && allowEmpty[missingPart])
    if (!config.needConfirm && finished && canConfirm()) {
      session.commit(orderedSelection())
      session.close()
    } else {
      const part = getNextRangeActivePart(next, completed)
      if (part) session.setActivePart(part, true)
    }
  }
  function completeRange() {
    const pending = orderedSelection()
    const allowEmpty = normalizeRangeAllowEmpty(session.getOptions().allowEmpty)
    return (
      session.mutable() &&
      Boolean(pending.start || pending.end) &&
      Boolean(pending.start || allowEmpty.start) &&
      Boolean(pending.end || allowEmpty.end) &&
      (!pending.start || valid(pending.start, 'start', pending)) &&
      (!pending.end || valid(pending.end, 'end', pending))
    )
  }
  function canConfirm() {
    if (!session.getConfig().showTime) return completeRange()
    const part = session.getSnapshot().activePart
    const value = selection()[part]
    return session.mutable() && Boolean(value && valid(value, part))
  }
  function selectTime(time: TimeValue | null) {
    if (!time || !session.mutable() || !session.getConfig().showTime) return
    const part = session.getSnapshot().activePart
    const previous = selection()[part]
    // showTime determines the concrete value; adapt it through the controller's shared CalendarValue constraint.
    const value = mergeDatePickerTime(
      previous ? getCalendarValueDate(previous) : session.getSnapshot().viewDate,
      time,
    ) as CalendarValue as TValue
    if (!valid(value, part)) return
    session.setPending(createNextRangeValue(selection(), value, part, false), undefined, part)
    if (!session.getConfig().needConfirm && completeRange()) session.commit(orderedSelection())
  }
  function confirm() {
    if (!canConfirm()) return
    if (session.getConfig().showTime) {
      const part = session.getSnapshot().activePart
      session.setPending(selection(), part)
      const next = getNextRangeActivePart(selection(), session.getSnapshot().completedParts)
      const allowEmpty = normalizeRangeAllowEmpty(session.getOptions().allowEmpty)
      if (next && !(allowEmpty[next] && !selection()[next])) {
        session.setActivePart(next, true)
        return
      }
      if (!completeRange()) return
    }
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
    const previewValue =
      snapshot.open && snapshot.activePart === part
        ? (snapshot.hoverValue ?? snapshot.previewValue)
        : null
    return previewValue ? formatDatePickerValue(previewValue, session.getConfig()) : source(part)
  }
  function previewCell(cell: CalendarCell) {
    const config = session.getConfig()
    if (
      !session.getSnapshot().open ||
      !session.mutable() ||
      cell.state.disabled ||
      !getCalendarNextPanel(cell.panel, config.picker)
    )
      return
    const part = session.getSnapshot().activePart
    const value = (config.showTime
      ? mergeDatePickerDate(cell.value, selection()[part], session.getOptions(), part)
      : normalizeDatePickerValue(
          getCalendarValueDate(cell.value),
          config.picker,
          config.weekStartsOn,
        )) as CalendarValue as TValue
    if (valid(value, session.getSnapshot().activePart)) session.setPreviewValue(value)
  }
  function setHoverValue(value: CalendarValue | null) {
    const config = session.getConfig()
    const part = session.getSnapshot().activePart
    const next = value
      ? ((config.showTime
          ? mergeDatePickerDate(value, selection()[part], session.getOptions(), part)
          : normalizeDatePickerValue(
              getCalendarValueDate(value),
              config.picker,
              config.weekStartsOn,
            )) as CalendarValue as TValue)
      : null
    session.setHoverValue(
      next &&
        session.getSnapshot().open &&
        session.mutable() &&
        valid(next, session.getSnapshot().activePart)
        ? next
        : null,
    )
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
      timeValue:
        getDatePickerTimeValue(rangeValue[snapshot.activePart]) ??
        (session.getConfig().showTime
          ? getDatePickerDefaultTime(session.getOptions(), snapshot.activePart)
          : null),
      timeOptions: {
        ...session.getConfig().timeOptions,
        disabledTime: (time: TimeValue) => {
          const active = rangeValue[snapshot.activePart]
          const date = active ? getCalendarValueDate(active) : snapshot.viewDate
          const from = getRangeFromValue(rangeValue, snapshot.activePart)
          return (
            session.getOptions().disabledTime?.(mergeDatePickerTime(date, time), {
              activePart: snapshot.activePart,
              from:
                from && getDatePickerTimeValue(from)
                  ? mergeDatePickerTime(getCalendarValueDate(from), getDatePickerTimeValue(from)!)
                  : null,
            }) ??
            session.getConfig().timeOptions.disabledTime?.(time) ??
            {}
          )
        },
      },
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
      displayRange: createRangePreviewValue(
        rangeValue,
        snapshot.hoverValue as TValue | null,
        snapshot.activePart,
        order,
      ),
      startText: text('start'),
      endText: text('end'),
      canClear:
        session.getConfig().clearable &&
        session.mutable() &&
        Boolean(rangeValue.start || rangeValue.end),
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
    selectTime,
  }
}

export type RangePickerController<TValue extends CalendarValue = CalendarValue> = ReturnType<
  typeof createRangePicker<TValue>
>
export type RangePickerState<TValue extends CalendarValue = CalendarValue> = ReturnType<
  RangePickerController<TValue>['getState']
>
