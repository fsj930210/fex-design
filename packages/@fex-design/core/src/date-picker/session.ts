import { hasDatePickerTime, resolveDatePickerTime } from './time'
import { getCalendarToday } from '../calendar/temporal'
import { getCalendarValueDate } from '../calendar/value'
import type { CalendarDate, CalendarPanel, CalendarValue } from '../calendar/types'
import { createStore } from '../store/create-store'
import { getDefaultPanelByPicker } from './panel'
import { getDatePickerFooterView } from './view'
import { definedPickerOptions, equalPickerValue, type PickerValueOptions } from './options'
import { getDefaultDatePickerFormat } from './value'
import type { DatePickerInputPart } from './types'

function allowsEmptyPart(value: unknown, part: DatePickerInputPart): boolean {
  return value === true || (typeof value === 'object' && value !== null && Boolean(Reflect.get(value, part)))
}

export interface PickerSessionSnapshot<TValue> {
  value: TValue
  pendingValue: TValue
  open: boolean
  panel: CalendarPanel
  viewDate: CalendarDate
  activePart: DatePickerInputPart
  completedParts: readonly DatePickerInputPart[]
  focusRequest: { part: DatePickerInputPart } | null
  hoverValue: CalendarValue | null
  previewValue: CalendarValue | null
}

export interface PickerSessionPolicy<TValue, TOptions extends PickerValueOptions<TValue>> {
  normalize?: ((value: TValue, options: TOptions) => TValue) | undefined
  empty: (options: TOptions) => TValue
  equal: (left: TValue, right: TValue) => boolean
  first: (value: TValue, part?: DatePickerInputPart) => CalendarValue | null
  activePart?: (value: TValue) => DatePickerInputPart
  needConfirm: (options: TOptions) => boolean
}

/** One transaction protocol for every framework; defaults are read only at creation. */
export function createPickerSession<TValue, TOptions extends PickerValueOptions<TValue>>(
  initialOptions: TOptions,
  policy: PickerSessionPolicy<TValue, TOptions>,
) {
  let options = definedPickerOptions(initialOptions)
  const sourceValue = options.value !== undefined
    ? options.value
    : options.defaultValue !== undefined ? options.defaultValue : policy.empty(options)
  const initialValue = policy.normalize?.(sourceValue, options) ?? sourceValue
  const initialDate = policy.first(initialValue)
  const store = createStore<PickerSessionSnapshot<TValue>>({
    value: initialValue,
    pendingValue: initialValue,
    open: options.open ?? options.defaultOpen ?? false,
    panel: getDefaultPanelByPicker(options.picker ?? 'date'),
    viewDate: initialDate ? getCalendarValueDate(initialDate) : getCalendarToday(),
    activePart: policy.activePart?.(initialValue) ?? 'start',
    completedParts: [],
    focusRequest: null,
    hoverValue: null,
    previewValue: null,
  })

  function reset(value: TValue, part?: DatePickerInputPart): Pick<PickerSessionSnapshot<TValue>, 'pendingValue' | 'panel' | 'viewDate' | 'activePart' | 'completedParts' | 'focusRequest' | 'hoverValue' | 'previewValue'> {
    const activePart = part ?? policy.activePart?.(value) ?? 'start'
    const selected = policy.first(value, hasDatePickerTime(options) ? activePart : undefined) ?? policy.first(value)
    return {
      pendingValue: value,
      panel: getDefaultPanelByPicker(options.picker ?? 'date'),
      viewDate: selected ? getCalendarValueDate(selected) : getCalendarToday(),
      activePart,
      completedParts: [],
      focusRequest: null,
      hoverValue: null,
      previewValue: null,
    }
  }

  function getActiveViewDate(value: TValue, part: DatePickerInputPart, fallback: CalendarDate) {
    const selected = hasDatePickerTime(options) ? policy.first(value, part) : null
    return selected ? getCalendarValueDate(selected) : fallback
  }

  function setOptions(nextOptions: TOptions) {
    const next = definedPickerOptions(nextOptions)
    const keys = Object.keys(options)
    if (keys.length === Object.keys(next).length && keys.every(key => Reflect.get(options, key) === Reflect.get(next, key))) return
    const previousOptions = options
    options = next
    const previous = store.getSnapshot()
    const sourceValue = options.value !== undefined ? options.value : previous.value
    const value = policy.normalize?.(sourceValue, options) ?? sourceValue
    const open = options.open !== undefined ? options.open : previous.open
    const valueChanged = !policy.equal(previous.value, value)
    const ignored = new Set(['value', 'open', 'defaultValue', 'defaultOpen', 'onChange', 'onOpenChange'])
    const configChanged = [...new Set([...Object.keys(previousOptions), ...Object.keys(options)])].some(key => {
      if (ignored.has(key)) return false
      const left = Reflect.get(previousOptions, key)
      const right = Reflect.get(options, key)
      if (key === 'minDate' || key === 'maxDate') return left?.toString() !== right?.toString()
      if (key === 'allowEmpty') return allowsEmptyPart(left, 'start') !== allowsEmptyPart(right, 'start') ||
        allowsEmptyPart(left, 'end') !== allowsEmptyPart(right, 'end')
      return left !== right
    })
    // Callback/default changes update options without publishing an identical state.
    if (!valueChanged && open === previous.open && !configChanged) return
    const resetSession = (open && !previous.open) || valueChanged ||
      options.picker !== previousOptions.picker ||
      policy.needConfirm(options) !== policy.needConfirm(previousOptions)
    store.setSnapshot({
      ...previous,
      ...(configChanged ? { hoverValue: null, previewValue: null, completedParts: [], focusRequest: null } : {}),
      ...(resetSession ? reset(value, open && !previous.open ? previous.activePart : undefined) : {}),
      ...(!open && previous.open ? { pendingValue: value, hoverValue: null, previewValue: null, completedParts: [], focusRequest: null, activePart: policy.activePart?.(value) ?? 'start', panel: getDefaultPanelByPicker(options.picker ?? 'date') } : {}),
      value,
      open,
    })
  }

  function setOpen(next: boolean, part?: DatePickerInputPart) {
    const previous = store.getSnapshot()
    if (next && options.disabled) return
    if (previous.open === next) {
      if (next && part && part !== previous.activePart) store.setSnapshot({ ...previous, activePart: part, viewDate: getActiveViewDate(previous.pendingValue, part, previous.viewDate), hoverValue: null, previewValue: null, focusRequest: null })
      return
    }
    store.setSnapshot({
      ...previous,
      ...(next ? reset(previous.value, part ?? previous.activePart) : {
        pendingValue: previous.value,
        activePart: policy.activePart?.(previous.value) ?? 'start',
        completedParts: [],
        focusRequest: null,
        hoverValue: null,
        previewValue: null,
        panel: getDefaultPanelByPicker(options.picker ?? 'date'),
      }),
      open: options.open === undefined ? next : previous.open,
    })
    options.onOpenChange?.(next)
  }

  function commit(next: TValue) {
    const previous = store.getSnapshot()
    const changed = !policy.equal(previous.value, next)
    if (!changed && policy.equal(previous.pendingValue, next) && !previous.hoverValue && !previous.previewValue && !previous.completedParts.length && !previous.focusRequest) return
    store.setSnapshot({
      ...previous,
      pendingValue: next,
      ...(changed && options.value === undefined ? { value: next } : {}),
      hoverValue: null,
      previewValue: null,
      completedParts: [],
      focusRequest: null,
    })
    if (changed) options.onChange?.(next)
  }

  return {
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    setOptions,
    getOptions: () => options,
    getSelection: () => policy.needConfirm(options) ? store.getSnapshot().pendingValue : store.getSnapshot().value,
    getConfig: () => ({
      picker: options.picker ?? 'date',
      needConfirm: policy.needConfirm(options),
      footerView: getDatePickerFooterView(policy.needConfirm(options)),
      disabled: options.disabled ?? false,
      clearable: options.clearable ?? true,
      showTime: hasDatePickerTime(options),
      timeOptions: resolveDatePickerTime(options),
      format: options.format ?? (hasDatePickerTime(options) ? 'YYYY-MM-DD ' + resolveDatePickerTime(options).format : getDefaultDatePickerFormat(options.picker ?? 'date')),
      weekStartsOn: options.weekStartsOn ?? 0,
      ...(options.minDate !== undefined ? { minDate: options.minDate } : {}),
      ...(options.maxDate !== undefined ? { maxDate: options.maxDate } : {}),
    }),
    mutable: () => !options.disabled,
    setOpen,
    close: () => setOpen(false),
    today: () => {
      const viewDate = getCalendarToday()
      const panel = getDefaultPanelByPicker(options.picker ?? 'date')
      store.updateSnapshot(state => state.viewDate.toString() === viewDate.toString() && state.panel === panel && !state.hoverValue && !state.previewValue
        ? state : ({ ...state, viewDate, panel, hoverValue: null, previewValue: null }))
    },
    commit,
    setPending: (pendingValue: TValue, completedPart?: DatePickerInputPart, invalidatePart?: DatePickerInputPart) => store.updateSnapshot(state => {
      const previousParts = invalidatePart ? state.completedParts.filter(part => part !== invalidatePart) : state.completedParts
      const completedParts = completedPart && !previousParts.includes(completedPart) ? [...previousParts, completedPart] : previousParts
      return policy.equal(state.pendingValue, pendingValue) && completedParts === state.completedParts && !state.hoverValue && !state.previewValue ? state
        : ({ ...state, pendingValue, completedParts, hoverValue: null, previewValue: null })
    }),
    setPanel: (panel: CalendarPanel) => store.updateSnapshot(state => state.panel === panel ? state : ({ ...state, panel, hoverValue: null })),
    setViewDate: (viewDate: CalendarDate) => store.updateSnapshot(state => state.viewDate.toString() === viewDate.toString() ? state : ({ ...state, viewDate, hoverValue: null })),
    setActivePart: (activePart: DatePickerInputPart, focus = false) => store.updateSnapshot(state => state.activePart === activePart && !focus ? state : ({ ...state, activePart, viewDate: getActiveViewDate(state.pendingValue, activePart, state.viewDate), focusRequest: focus ? { part: activePart } : null, hoverValue: null, previewValue: null })),
    setHoverValue: (hoverValue: CalendarValue | null) => store.updateSnapshot(state => equalPickerValue(state.hoverValue, hoverValue) ? state : ({ ...state, hoverValue })),
    setPreviewValue: (previewValue: CalendarValue | null) => store.updateSnapshot(state => equalPickerValue(state.previewValue, previewValue) && !state.hoverValue ? state : ({ ...state, previewValue, hoverValue: null })),
  }
}
