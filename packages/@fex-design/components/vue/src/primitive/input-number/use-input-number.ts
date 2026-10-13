import type {
  InputNumberConstraints,
  InputNumberFormatter,
  InputNumberParser,
} from '@fex-design/core/input-number/types'
import {
  canChangeInputNumber,
  canStepInputNumber,
  defaultInputNumberFormatter,
  defaultInputNumberParser,
  isInputNumberOutOfRange,
  normalizeInputNumber,
  parseInputNumber,
  stepInputNumber,
} from '@fex-design/core/input-number/value'
import { computed, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

export interface UseInputNumberOptions extends InputNumberConstraints {
  controlled?: boolean | undefined
  value?: number | undefined
  defaultValue?: number | undefined
  parser?: InputNumberParser | undefined
  formatter?: InputNumberFormatter | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  keyboard?: boolean | undefined
  onChange?: ((event: Event, value: number | undefined) => void) | undefined
}

export function useInputNumber(source: MaybeRefOrGetter<UseInputNumberOptions> = {}) {
  const options = computed(() => toValue(source))
  const internalValue = ref(options.value.defaultValue)
  const controlled = computed(() => options.value.controlled ?? options.value.value !== undefined)
  const externalValue = computed(() => controlled.value ? options.value.value : undefined)
  const value = computed(() =>
    controlled.value ? externalValue.value : internalValue.value,
  )
  const parser = computed(() => options.value.parser ?? defaultInputNumberParser)
  const formatter = computed(() => options.value.formatter ?? defaultInputNumberFormatter)
  const constraints = computed(() => ({
    min: options.value.min,
    max: options.value.max,
    step: options.value.step,
    precision: options.value.precision,
  }))
  const userTyping = ref(false)
  const draft = ref(formatter.value(value.value, { userTyping: false, input: '' }))
  const setValue = (next: number | undefined) => {
    if (!controlled.value) internalValue.value = next
  }
  const commit = (next: number | undefined) => {
    const normalized =
      next === undefined ? undefined : normalizeInputNumber(next, constraints.value)
    setValue(normalized)
    userTyping.value = false
    draft.value = formatter.value(normalized, { userTyping: false, input: draft.value })
    return normalized
  }
  const changeBy = (event: Event, direction: 'increment' | 'decrement') => {
    if (!canChangeInputNumber(options.value, event)) return
    if (!canStepInputNumber(value.value, direction, constraints.value)) return
    const next = commit(
      stepInputNumber(
        parseInputNumber(draft.value, parser.value) ?? value.value,
        direction,
        constraints.value,
      ),
    )
    options.value.onChange?.(event, next)
    return next
  }
  const input = (text: string, event: Event) => {
    if (!canChangeInputNumber(options.value, event)) return
    userTyping.value = true
    draft.value = text
    const next = parseInputNumber(text, parser.value)
    if (text.trim() === '' || next !== undefined) {
      setValue(next)
      options.value.onChange?.(event, next)
    }
    return next
  }
  const blur = (event: Event) => {
    if (!canChangeInputNumber(options.value, event)) return
    const before = value.value
    const next = commit(parseInputNumber(draft.value, parser.value) ?? before)
    if (next !== before) options.value.onChange?.(event, next)
  }
  const keydown = (event: KeyboardEvent) => {
    if (options.value.keyboard === false || !canChangeInputNumber(options.value, event)) return
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      changeBy(event, event.key === 'ArrowUp' ? 'increment' : 'decrement')
      event.preventDefault()
    }
  }
  const clear = (event?: Event) => {
    if (!canChangeInputNumber(options.value, event)) return
    const next = commit(undefined)
    if (event) options.value.onChange?.(event, next)
    return next
  }
  // External value or formatter changes refresh the buffer only outside active typing.
  watch([controlled, externalValue, formatter], ([, , format]) => {
    if (!userTyping.value) draft.value = format(value.value, { userTyping: false, input: '' })
  })
  return {
    disabled: computed(() => options.value.disabled ?? false),
    readOnly: computed(() => options.value.readOnly ?? false),
    parseDraft: () => parseInputNumber(draft.value, parser.value),
    value,
    draft,
    userTyping,
    min: computed(() => options.value.min),
    max: computed(() => options.value.max),
    formattedValue: computed(() =>
      formatter.value(value.value, { userTyping: false, input: draft.value }),
    ),
    outOfRange: computed(() => isInputNumberOutOfRange(value.value, constraints.value)),
    canClear: computed(
      () => value.value !== undefined && !options.value.disabled && !options.value.readOnly,
    ),
    canIncrement: computed(
      () =>
        !options.value.disabled &&
        !options.value.readOnly &&
        (options.value.max === undefined ||
          value.value === undefined ||
          value.value < options.value.max),
    ),
    canDecrement: computed(
      () =>
        !options.value.disabled &&
        !options.value.readOnly &&
        (options.value.min === undefined ||
          value.value === undefined ||
          value.value > options.value.min),
    ),
    input,
    blur,
    keydown,
    clear,
    increment: (event: Event) => changeBy(event, 'increment'),
    decrement: (event: Event) => changeBy(event, 'decrement'),
    commit,
  }
}

export type UseInputNumberReturn = ReturnType<typeof useInputNumber>
