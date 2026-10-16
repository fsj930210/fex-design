import { createStore } from '../store/create-store'
import { format as formatDate, parse } from '../date/utils'
import { resolveDisabledTime } from './options'
import type { TimePeriod, TimePickerController, TimePickerControllerOptions, TimePickerSnapshot, TimeValue } from './types'
import { EMPTY_TIME_VALUE, from12Hour, getTimePeriod, normalizeTimeValue, to12Hour } from './value'

export function createTimePickerController(initial: TimePickerControllerOptions = {}): TimePickerController {
  let options = initial
  let controlled = options.value !== undefined
  let scrollRequestId = 0
  const normalize = (value: TimeValue | null | undefined) => value ? normalizeTimeValue(value) : null
  const format = () => options.format ?? (options.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss')
  const display = (value: TimeValue | null) => value ? formatDate(value, format()) : ''
  const initialValue = normalize(controlled ? options.value : options.defaultValue)
  const store = createStore<TimePickerSnapshot>({ value: initialValue, inputValue: display(initialValue), scrollRequest: null })
  const currentValue = () => store.getSnapshot().value
  const blocked = () => Boolean(options.disabled || options.readOnly)

  function publish(value: TimeValue | null, scroll?: 'auto' | 'smooth', inputValue = display(value)) {
    store.updateSnapshot(snapshot => {
      const scrollRequest = scroll ? { id: ++scrollRequestId, behavior: scroll } : snapshot.scrollRequest
      if (sameTime(snapshot.value, value) && snapshot.inputValue === inputValue && scrollRequest === snapshot.scrollRequest) return snapshot
      return { value, inputValue, scrollRequest }
    })
  }

  function change(nextValue: TimeValue | null, reason: Parameters<TimePickerController['change']>[1], scroll?: 'auto' | 'smooth') {
    if (blocked()) return
    const previousValue = currentValue()
    const normalized = normalize(nextValue)
    // Validate the complete candidate, including dependent minute/second constraints.
    if (normalized) {
      const disabled = resolveDisabledTime(options.disabledTime, normalized)
      if (disabled.hours.includes(normalized.hour) || disabled.minutes.includes(normalized.minute) || disabled.seconds.includes(normalized.second) || disabled.milliseconds.includes(normalized.millisecond ?? 0)) return
    }
    // A controlled action reports intent; only setOptions may replace its committed value.
    if (!controlled) publish(normalized, scroll)
    else if (scroll) publish(previousValue, scroll, store.getSnapshot().inputValue)
    if (!sameTime(normalized, previousValue)) options.onChange?.(normalized, { reason, previousValue })
  }

  function setOptions(next: TimePickerControllerOptions) {
    const previousFormat = format()
    options = next
    controlled = next.value !== undefined
    const value = controlled ? normalize(next.value) : currentValue()
    if (!sameTime(value, currentValue()) || previousFormat !== format()) publish(value)
  }
  const baseValue = () => currentValue() ?? { ...EMPTY_TIME_VALUE }

  return {
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    setOptions,
    setControlledValue(value) { setOptions({ ...options, value }) },
    change,
    input(text) {
      if (blocked()) return
      publish(currentValue(), undefined, text)
      const result = parse(text, format())
      if (result.valid) change(result.value, 'input', 'smooth')
    },
    selectHour(hour, use12Hours = options.use12Hours ?? false) {
      const current = baseValue()
      change({ ...current, hour: use12Hours ? from12Hour(hour, getTimePeriod(current.hour)) : hour }, 'hour', 'smooth')
    },
    selectMinute(minute) { change({ ...baseValue(), minute }, 'minute', 'smooth') },
    selectSecond(second) { change({ ...baseValue(), second }, 'second', 'smooth') },
    selectPeriod(period: TimePeriod) {
      if (!options.use12Hours) return
      const current = baseValue()
      change({ ...current, hour: from12Hour(to12Hour(current.hour), period) }, 'period', 'smooth')
    },
    clear() {
      if (blocked()) return
      change(null, 'clear')
      // Clearing also resets an invalid input draft when the committed value is already empty.
      if (controlled) publish(currentValue())
    },
    scrollToValue(behavior = 'smooth') { publish(currentValue(), behavior, store.getSnapshot().inputValue) },
  }
}

function sameTime(left: TimeValue | null, right: TimeValue | null): boolean {
  if (!left || !right) return left === right
  return left.hour === right.hour && left.minute === right.minute && left.second === right.second && (left.millisecond ?? 0) === (right.millisecond ?? 0)
}
