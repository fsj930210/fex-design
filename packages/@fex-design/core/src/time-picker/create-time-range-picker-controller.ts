import { createStore } from '../store/create-store'
import { normalizeTimeValue } from './value'
import { resolveDisabledTime } from './options'
import type { TimeValue } from './types'
import type {
  TimeRangeDraft,
  TimeRangeValue,
  TimeRangePickerOptions,
  TimeRangePickerSnapshot,
  TimeRangePickerController,
  TimeRangeChangeDetails,
} from './range-types'

const emptyRange: TimeRangeDraft = [null, null]
const timeNumber = (value: TimeValue) =>
  ((value.hour * 60 + value.minute) * 60 + value.second) * 1000 + (value.millisecond ?? 0)
const sameTime = (a: TimeValue | null, b: TimeValue | null) =>
  a === b || Boolean(a && b && timeNumber(a) === timeNumber(b))
const sameRange = (a: TimeRangeDraft | null, b: TimeRangeDraft | null) =>
  a === b || Boolean(a && b && sameTime(a[0], b[0]) && sameTime(a[1], b[1]))
const normalize = (value: TimeRangeValue | null | undefined): TimeRangeValue | null =>
  value ? [normalizeTimeValue(value[0]), normalizeTimeValue(value[1])] : null

/** A single session owns both endpoints, pending selection, cancellation and commit. */
export function createTimeRangePickerController(
  initial: TimeRangePickerOptions = {},
): TimeRangePickerController {
  let options = initial
  let needConfirm = initial.needConfirm !== false
  let validation = [initial.disabled, initial.readOnly, initial.disabledTime] as const
  const initialValue = normalize(initial.value !== undefined ? initial.value : initial.defaultValue)
  const store = createStore<TimeRangePickerSnapshot>({
    value: initialValue,
    draft: initialValue ?? emptyRange,
    activePart: 'start',
    completedParts: [],
    focusRequest: null,
    open: initial.open ?? initial.defaultOpen ?? false,
  })
  const blocked = () => Boolean(options.disabled || options.readOnly)

  function valid(value: TimeValue | null): value is TimeValue {
    if (!value) return false
    const disabled = resolveDisabledTime(options.disabledTime, value)
    return (
      !disabled.hours.includes(value.hour) &&
      !disabled.minutes.includes(value.minute) &&
      !disabled.seconds.includes(value.second) &&
      !disabled.milliseconds.includes(value.millisecond ?? 0)
    )
  }

  function complete(draft: TimeRangeDraft): TimeRangeValue | null {
    const [start, end] = draft
    return valid(start) && valid(end) && timeNumber(start) <= timeNumber(end) ? [start, end] : null
  }

  function canConfirm() {
    const { draft, activePart } = store.getSnapshot()
    return !blocked() && valid(draft[activePart === 'start' ? 0 : 1])
  }

  function applyOpen(open: boolean) {
    store.updateSnapshot((previous) =>
      previous.open === open
        ? previous
        : {
            ...previous,
            open,
            activePart: open ? previous.activePart : 'start',
            draft: previous.value ?? emptyRange,
            completedParts: [],
            focusRequest: null,
          },
    )
  }

  function setOpen(open: boolean) {
    if ((open && options.disabled) || store.getSnapshot().open === open) return
    if (options.open === undefined) applyOpen(open)
    options.onOpenChange?.(open)
  }

  function commit(value: TimeRangeValue | null, reason: TimeRangeChangeDetails['reason']) {
    const previous = store.getSnapshot()
    if (sameRange(previous.value, value)) return
    if (options.value === undefined) store.updateSnapshot((snapshot) => ({ ...snapshot, value }))
    options.onChange?.(value, { reason, activePart: previous.activePart })
  }

  return {
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    setOptions(next) {
      const previous = store.getSnapshot()
      const value = next.value !== undefined ? normalize(next.value) : previous.value
      const open = next.open ?? previous.open
      const nextNeedConfirm = next.needConfirm !== false
      const reset =
        !sameRange(value, previous.value) ||
        open !== previous.open ||
        nextNeedConfirm !== needConfirm
      const validationChanged =
        next.disabled !== validation[0] ||
        next.readOnly !== validation[1] ||
        next.disabledTime !== validation[2]
      needConfirm = nextNeedConfirm
      validation = [next.disabled, next.readOnly, next.disabledTime]
      options = next
      if (reset)
        store.setSnapshot({
          ...previous,
          value,
          open,
          activePart: open ? previous.activePart : 'start',
          draft: value ?? emptyRange,
          completedParts: [],
          focusRequest: null,
        })
      // Refresh canConfirm consumers when external constraints change, without emitting change.
      else if (validationChanged) store.setSnapshot({ ...previous })
    },
    setOpen,
    activate(part) {
      if (options.disabled) return
      setOpen(true)
      store.updateSnapshot((previous) =>
        previous.activePart === part && !previous.focusRequest
          ? previous
          : { ...previous, activePart: part, focusRequest: null },
      )
    },
    select(value, reason) {
      if (blocked()) return
      const previous = store.getSnapshot()
      const next = value ? normalizeTimeValue(value) : null
      const draft: TimeRangeDraft =
        previous.activePart === 'start' ? [next, previous.draft[1]] : [previous.draft[0], next]
      store.updateSnapshot((snapshot) => ({
        ...snapshot,
        draft,
        completedParts: snapshot.completedParts.filter((part) => part !== snapshot.activePart),
      }))
      const range = complete(draft)
      // Incomplete or reversed intervals remain pending, even in immediate mode.
      if (options.needConfirm === false && range) commit(range, reason)
    },
    canConfirm,
    confirm() {
      if (!canConfirm()) return
      const previous = store.getSnapshot()
      const completedParts = previous.completedParts.includes(previous.activePart)
        ? previous.completedParts
        : [...previous.completedParts, previous.activePart]
      const next =
        (['start', 'end'] as const).find((part) => !previous.draft[part === 'start' ? 0 : 1]) ??
        (['start', 'end'] as const).find((part) => !completedParts.includes(part))
      if (next) {
        store.setSnapshot({
          ...previous,
          completedParts,
          activePart: next,
          focusRequest: { part: next },
        })
        return
      }
      store.setSnapshot({ ...previous, completedParts })
      const value = complete(previous.draft)
      if (!value) return
      commit(value, 'confirm')
      setOpen(false)
    },
    cancel() {
      setOpen(false)
    },
    clear() {
      if (blocked()) return
      store.updateSnapshot((snapshot) => ({ ...snapshot, draft: emptyRange }))
      commit(null, 'clear')
      setOpen(false)
    },
  }
}
