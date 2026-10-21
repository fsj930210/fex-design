import {
  hasDatePickerTime,
  mergeDatePickerDate,
  mergeDatePickerTime,
  getDatePickerTimeValue,
  getDatePickerDefaultTime,
  isDatePickerTimeDisabled,
} from './time'
import type { TimeValue } from '../time-picker/types'
import type { CalendarCell, CalendarDate, CalendarValue } from '../calendar/types'
import { getCalendarNextPanel } from '../calendar/navigation'
import { getCalendarValueDate } from '../calendar/value'
import { createDatePickerDisabledDate, isDatePickerValueDisabled } from './constraints'
import { definedPickerOptions, equalPickerValue, type PickerValueOptions } from './options'
import { createPickerSession } from './session'
import { formatDatePickerValue, normalizeDatePickerValue } from './value'
import { getDatePickerTriggerView } from './view'
import type { DatePickerDisabledDateInfo } from './types'

export type DatePickerSelectionValue<TValue extends CalendarValue = CalendarValue> =
  | TValue
  | readonly TValue[]
  | null

export interface DatePickerOptions<
  TValue extends CalendarValue = CalendarValue,
> extends PickerValueOptions<DatePickerSelectionValue<TValue>> {
  multiple?: boolean | undefined
  maxCount?: number | undefined
  disabledDate?:
    | ((date: CalendarDate, info: DatePickerDisabledDateInfo<TValue>) => boolean)
    | undefined
}

export function isPickerValueArray<TValue extends CalendarValue>(
  value: DatePickerSelectionValue<TValue>,
): value is readonly TValue[] {
  return Array.isArray(value)
}

export function equalDatePickerSelection(
  left: DatePickerSelectionValue,
  right: DatePickerSelectionValue,
) {
  if (left === right) return true
  if (isPickerValueArray(left) || isPickerValueArray(right)) {
    if (!isPickerValueArray(left) || !isPickerValueArray(right)) return false
    return (
      left.length === right.length &&
      left.every((value, index) => equalPickerValue(value, right[index]))
    )
  }
  return equalPickerValue(left, right)
}

export function createDatePicker<TValue extends CalendarValue = CalendarValue>(
  initialOptions: DatePickerOptions<TValue> = {},
) {
  const session = createPickerSession<DatePickerSelectionValue<TValue>, DatePickerOptions<TValue>>(
    definedPickerOptions(initialOptions),
    {
      normalize: (value, options) =>
        hasDatePickerTime(options) && value && !isPickerValueArray(value)
          ? (mergeDatePickerDate(value, value, options) as CalendarValue as TValue)
          : value,
      empty: (options) => (options.multiple ? [] : null),
      equal: equalDatePickerSelection,
      first: (value) => (isPickerValueArray(value) ? (value[0] ?? null) : value),
      needConfirm: (options) =>
        options.needConfirm ?? (hasDatePickerTime(options) || options.multiple || false),
    },
  )
  const constraints = () => ({
    ...session.getConfig(),
    panel: session.getSnapshot().panel,
    ...definedPickerOptions({ disabledDate: session.getOptions().disabledDate }),
  })
  function valid(value: TValue) {
    return (
      !isDatePickerValueDisabled(value, constraints()) &&
      !isDatePickerTimeDisabled(value, session.getOptions())
    )
  }
  function display() {
    const value = session.getSelection()
    return isPickerValueArray(value)
      ? value.map((item) => formatDatePickerValue(item, session.getConfig())).join(', ')
      : formatDatePickerValue(value, session.getConfig())
  }
  function select(value: TValue) {
    if (!session.mutable()) return
    const config = session.getConfig()
    value = (config.showTime
      ? mergeDatePickerDate(
          value,
          isPickerValueArray(session.getSelection())
            ? null
            : (session.getSelection() as TValue | null),
          session.getOptions(),
        )
      : normalizeDatePickerValue(
          getCalendarValueDate(value),
          config.picker,
          config.weekStartsOn,
        )) as CalendarValue as TValue
    if (
      config.showTime && config.needConfirm
        ? isDatePickerValueDisabled(value, constraints())
        : !valid(value)
    )
      return
    if (session.getOptions().multiple) {
      const current = session.getSelection()
      const values = isPickerValueArray(current) ? current : []
      const next = values.some((item) => equalPickerValue(item, value))
        ? values.filter((item) => !equalPickerValue(item, value))
        : [...values, value]
      if (config.needConfirm) session.setPending(next)
      else session.commit(next)
    } else if (config.needConfirm) session.setPending(value)
    else {
      session.commit(value)
      if (!config.showTime) session.close()
    }
  }
  function selectTime(time: TimeValue | null) {
    if (!time || !session.mutable() || !session.getConfig().showTime) return
    const current = session.getSelection()
    if (isPickerValueArray(current)) return
    // showTime determines the concrete value; adapt it through the controller's shared CalendarValue constraint.
    const value = mergeDatePickerTime(
      current ? getCalendarValueDate(current) : session.getSnapshot().viewDate,
      time,
    ) as CalendarValue as TValue
    if (!valid(value)) return
    if (session.getConfig().needConfirm) session.setPending(value)
    else session.commit(value)
  }
  function clear() {
    if (!session.mutable()) return
    const empty = session.getOptions().multiple ? [] : null
    session.commit(empty)
  }
  function remove(value: TValue) {
    if (!session.mutable() || !session.getOptions().multiple) return
    const current = session.getSelection()
    if (!isPickerValueArray(current) || !current.some((item) => equalPickerValue(item, value)))
      return
    const next = current.filter((item) => !equalPickerValue(item, value))
    if (session.getConfig().needConfirm) session.setPending(next)
    else session.commit(next)
  }
  function canConfirm() {
    const pending = session.getSnapshot().pendingValue
    if (session.getConfig().showTime && !pending) return false
    return (
      session.mutable() &&
      (isPickerValueArray(pending) ? pending.every(valid) : !pending || valid(pending))
    )
  }
  function confirm() {
    if (!canConfirm()) return
    if (session.getConfig().needConfirm) session.commit(session.getSnapshot().pendingValue)
    session.close()
  }
  function previewCell(cell: CalendarCell) {
    const config = session.getConfig()
    if (
      !session.getSnapshot().open ||
      !session.mutable() ||
      session.getOptions().multiple ||
      cell.state.disabled ||
      !getCalendarNextPanel(cell.panel, config.picker)
    )
      return
    const selected = session.getSelection()
    const value = (config.showTime
      ? mergeDatePickerDate(
          cell.value,
          isPickerValueArray(selected) ? null : selected,
          session.getOptions(),
        )
      : normalizeDatePickerValue(
          getCalendarValueDate(cell.value),
          config.picker,
          config.weekStartsOn,
        )) as CalendarValue as TValue
    if (valid(value)) session.setPreviewValue(value)
  }
  function setHoverValue(value: CalendarValue | null) {
    const config = session.getConfig()
    const selected = session.getSelection()
    const next = value
      ? ((config.showTime
          ? mergeDatePickerDate(
              value,
              isPickerValueArray(selected) ? null : selected,
              session.getOptions(),
            )
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
        !session.getOptions().multiple &&
        valid(next)
        ? next
        : null,
    )
  }
  function getState() {
    const snapshot = session.getSnapshot()
    const value = session.getSelection()
    const previewValue = snapshot.open ? (snapshot.hoverValue ?? snapshot.previewValue) : null
    const displayValue = previewValue
      ? formatDatePickerValue(previewValue, session.getConfig())
      : display()
    return {
      ...session.getConfig(),
      open: snapshot.open,
      panel: snapshot.panel,
      viewDate: snapshot.viewDate,
      hoverValue: snapshot.hoverValue,
      previewValue: snapshot.previewValue,
      value,
      committedValue: snapshot.value,
      pendingValue: snapshot.pendingValue,
      timeValue:
        getDatePickerTimeValue(isPickerValueArray(value) ? null : value) ??
        (session.getConfig().showTime
          ? getDatePickerDefaultTime(session.getOptions(), 'start')
          : null),
      timeOptions: {
        ...session.getConfig().timeOptions,
        disabledTime: (time: TimeValue) => {
          const date =
            isPickerValueArray(value) || !value ? snapshot.viewDate : getCalendarValueDate(value)
          return (
            session.getOptions().disabledTime?.(mergeDatePickerTime(date, time), {
              activePart: 'start',
              from: null,
            }) ??
            session.getConfig().timeOptions.disabledTime?.(time) ??
            {}
          )
        },
      },
      multiple: session.getOptions().multiple ?? false,
      maxCount: session.getOptions().maxCount,
      triggerView: getDatePickerTriggerView({
        open: snapshot.open,
        hoverValue: snapshot.hoverValue,
        multiple: session.getOptions().multiple ?? false,
        calendarValues: isPickerValueArray(value) ? value : [],
      }),
      calendarValue: isPickerValueArray(value)
        ? null
        : value && session.getConfig().showTime
          ? getCalendarValueDate(value)
          : value,
      calendarValues: isPickerValueArray(value) ? value : [],
      inputValue: session.getOptions().multiple ? '' : displayValue,
      displayValue,
      canClear:
        session.getConfig().clearable &&
        session.mutable() &&
        (isPickerValueArray(value) ? value.length > 0 : Boolean(value)),
      canConfirm: canConfirm(),
      disabledDate: createDatePickerDisabledDate(constraints()),
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
    setHoverValue,
    previewCell,
    openPanel: () => session.setOpen(true),
    close: session.close,
    today: session.today,
    cancel: session.close,
    clear,
    confirm,
    select,
    selectTime,
    remove,
  }
}

export type DatePickerController<TValue extends CalendarValue = CalendarValue> = ReturnType<
  typeof createDatePicker<TValue>
>
export type DatePickerState<TValue extends CalendarValue = CalendarValue> = ReturnType<
  DatePickerController<TValue>['getState']
>
