import { createStore } from '../store/create-store'
import type {
  SliderChangeMeta,
  SliderChangeSource,
  SliderController,
  SliderOptions,
  SliderSnapshot,
} from './types'
import { clamp, getClosestValueIndex, normalizeSliderValue } from './utils'

function createSnapshot(options: SliderOptions, fallback?: readonly number[]): SliderSnapshot {
  const first = Number.isFinite(options.min) ? options.min! : 0
  const second = Number.isFinite(options.max) ? options.max! : 100
  const [min, max] = first <= second ? [first, second] : [second, first]
  const step =
    options.step === null
      ? null
      : Number.isFinite(options.step) && options.step! > 0
        ? options.step!
        : 1
  const marks = [...new Set(options.marks ?? [])]
    .filter((value) => Number.isFinite(value) && value >= min && value <= max)
    .sort((a, b) => a - b)
  const source = options.value ?? fallback ?? options.defaultValue ?? [min]
  const values = source
    .map((value) => normalizeSliderValue(value, min, max, step, marks))
    .sort((a, b) => a - b)
  return {
    values: values.length ? values : [min],
    disabled: options.disabled === true,
    disabledThumbs: values.map((_, index) => options.disabledThumbs?.[index] === true),
    min,
    max,
    step,
    marks,
    minStepsBetweenThumbs: Math.max(0, options.minStepsBetweenThumbs ?? 0),
    activeIndex: 0,
    orientation: options.orientation ?? 'horizontal',
    direction: options.direction ?? 'ltr',
    reverse: options.reverse === true,
    keyboard: options.keyboard !== false,
    draggableRange: options.draggableRange === true,
    editable: options.editable === true,
    minCount: Math.max(0, options.minCount ?? 0),
    maxCount: Math.max(1, options.maxCount ?? Number.POSITIVE_INFINITY),
  }
}

function equalValues(left: readonly number[], right: readonly number[]) {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

export function createSliderController(options: SliderOptions = {}): SliderController {
  const isControlled = () => options.value !== undefined
  const store = createStore(createSnapshot(options))
  let derived = store.getSnapshot()
  let interactionStart = derived.values
  let interactionSource: SliderChangeSource = 'pointer'
  let rangeAnchor = 0
  let rangeStartValues = derived.values
  let transientValues: number[] | undefined
  let hasInteracted = false

  function getSnapshot() {
    const stored = store.getSnapshot()
    const shouldReadDefault = !hasInteracted && options.defaultValue !== undefined
    const next = createSnapshot(
      options,
      isControlled() || shouldReadDefault ? undefined : stored.values,
    )
    if (isControlled() && transientValues) {
      if (options.value && !equalValues(options.value, interactionStart))
        transientValues = undefined
      else next.values = transientValues
    }
    next.activeIndex = clamp(stored.activeIndex, 0, next.values.length - 1)
    if (JSON.stringify(derived) !== JSON.stringify(next)) derived = next
    return derived
  }

  function publish(values: number[], changedIndex: number | null, source: SliderChangeSource) {
    const previous = getSnapshot()
    if (previous.disabled) return undefined
    hasInteracted = true
    const meta: SliderChangeMeta = { previousValues: previous.values, values, changedIndex, source }
    transientValues = isControlled() ? values : undefined
    store.setSnapshot({ ...previous, values, activeIndex: changedIndex ?? previous.activeIndex })
    options.onChange?.(values, meta)
    return meta
  }

  function emitEnd(meta: SliderChangeMeta) {
    options.onEnd?.(meta.values, { ...meta, previousValues: interactionStart })
  }

  function setValueAt(
    index: number,
    value: number,
    action: { end?: boolean; source?: SliderChangeSource } = {},
  ) {
    const current = getSnapshot()
    if (action.source === 'keyboard' && interactionSource !== 'keyboard') {
      interactionStart = current.values
      interactionSource = 'keyboard'
    }
    if (current.disabled || current.disabledThumbs[index] || current.values[index] === undefined)
      return undefined
    const normalized = normalizeSliderValue(
      value,
      current.min,
      current.max,
      current.step,
      current.marks,
    )
    const gap = current.step === null ? 0 : current.minStepsBetweenThumbs * current.step
    const lower = index === 0 ? current.min : current.values[index - 1]! + gap
    const upper =
      index === current.values.length - 1 ? current.max : current.values[index + 1]! - gap
    const nextValue = clamp(normalized, lower, upper)
    if (nextValue === current.values[index]) return undefined
    const values = [...current.values]
    values[index] = nextValue
    const meta = publish(values, index, action.source ?? interactionSource)
    if (action.end && meta) emitEnd(meta)
    return meta
  }

  const controller: SliderController = {
    getSnapshot,
    subscribe: store.subscribe,
    syncSnapshot: () => store.setSnapshot(getSnapshot()),
    setValueAt,
    setActiveIndex(index) {
      const current = getSnapshot()
      store.setSnapshot({ ...current, activeIndex: clamp(index, 0, current.values.length - 1) })
    },
    startSlide(value, source = 'pointer') {
      const current = getSnapshot()
      interactionStart = current.values
      interactionSource = source
      const index = getClosestValueIndex(current.values, value, current.disabledThumbs)
      if (index < 0) return undefined
      controller.setActiveIndex(index)
      return setValueAt(index, value, { source })
    },
    moveSlide: (value) => setValueAt(getSnapshot().activeIndex, value),
    startRangeSlide(value) {
      const current = getSnapshot()
      interactionStart = current.values
      interactionSource = 'range'
      rangeAnchor = value
      rangeStartValues = current.values
    },
    moveRangeSlide(value) {
      const current = getSnapshot()
      if (!current.draggableRange || current.disabledThumbs.some(Boolean)) return undefined
      const delta = clamp(
        value - rangeAnchor,
        current.min - rangeStartValues[0]!,
        current.max - rangeStartValues.at(-1)!,
      )
      const values = rangeStartValues.map((item) =>
        normalizeSliderValue(item + delta, current.min, current.max, current.step, current.marks),
      )
      return equalValues(values, current.values) ? undefined : publish(values, null, 'range')
    },
    endSlide() {
      const current = getSnapshot()
      if (equalValues(interactionStart, current.values)) return undefined
      const meta: SliderChangeMeta = {
        previousValues: interactionStart,
        values: current.values,
        changedIndex: current.activeIndex,
        source: interactionSource,
      }
      emitEnd(meta)
      interactionStart = current.values
      interactionSource = 'pointer'
      return meta
    },
    cancelSlide() {
      interactionStart = getSnapshot().values
    },
    stepThumb(index, direction, multiplier = 1, end = false) {
      const current = getSnapshot()
      if (!current.keyboard) return undefined
      if (interactionSource !== 'keyboard') interactionStart = current.values
      interactionSource = 'keyboard'
      return setValueAt(
        index,
        current.values[index]! + (current.step ?? 1) * direction * multiplier,
        { end, source: 'keyboard' },
      )
    },
    addValue(value) {
      const current = getSnapshot()
      if (!current.editable || current.values.length >= current.maxCount) return undefined
      interactionStart = current.values
      interactionSource = 'add'
      const nextValue = normalizeSliderValue(
        value,
        current.min,
        current.max,
        current.step,
        current.marks,
      )
      const values = [...current.values, nextValue].sort((a, b) => a - b)
      return publish(values, values.indexOf(nextValue), 'add')
    },
    removeValue(index) {
      const current = getSnapshot()
      if (
        !current.editable ||
        current.values.length <= current.minCount ||
        current.disabledThumbs[index]
      )
        return undefined
      interactionStart = current.values
      interactionSource = 'remove'
      const values = current.values.filter((_, itemIndex) => itemIndex !== index)
      return publish(values, index, 'remove')
    },
  }
  return controller
}
