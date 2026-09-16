import type {
  InputNumberConstraints,
  InputNumberFormatter,
  InputNumberParser,
} from '@fex-design/core/input-number/types'
import {
  defaultInputNumberFormatter,
  defaultInputNumberParser,
  isInputNumberOutOfRange,
  normalizeInputNumber,
  parseInputNumber,
  stepInputNumber,
} from '@fex-design/core/input-number/value'
import { computed, effect, signal, type Signal } from '@angular/core'
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
export function useInputNumber(options: Signal<UseInputNumberOptions>) {
  const internalValue = signal(options().defaultValue)
  const value = computed(() => (options().controlled ? options().value : internalValue()))
  const draft = signal(
    (options().formatter ?? defaultInputNumberFormatter)(value(), { userTyping: false, input: '' }),
  )
  const parser = () => options().parser ?? defaultInputNumberParser
  const formatter = () => options().formatter ?? defaultInputNumberFormatter
  const constraints = () => ({
    min: options().min,
    max: options().max,
    step: options().step,
    precision: options().precision,
  })
  let editing = false
  // Synchronize caller-owned controlled values into the editable text buffer outside active typing.
  effect(() => {
    const next = value()
    if (!editing) draft.set(formatter()(next, { userTyping: false, input: '' }))
  })
  const setValue = (next: number | undefined) => {
    if (!options().controlled) internalValue.set(next)
  }
  const commit = (next: number | undefined) => {
    const normalized = next === undefined ? undefined : normalizeInputNumber(next, constraints())
    setValue(normalized)
    draft.set(formatter()(normalized, { userTyping: false, input: draft() }))
    return normalized
  }
  const changeBy = (event: Event, direction: 'increment' | 'decrement') => {
    const next = commit(
      stepInputNumber(parseInputNumber(draft(), parser()) ?? value(), direction, constraints()),
    )
    options().onChange?.(event, next)
  }
  return {
    value,
    draft,
    min: computed(() => options().min),
    max: computed(() => options().max),
    formattedValue: computed(() => formatter()(value(), { userTyping: false, input: draft() })),
    outOfRange: computed(() => isInputNumberOutOfRange(value(), constraints())),
    canClear: computed(() => value() !== undefined && !options().disabled && !options().readOnly),
    canIncrement: computed(
      () =>
        !options().disabled &&
        !options().readOnly &&
        (options().max === undefined || value() === undefined || value()! < options().max!),
    ),
    canDecrement: computed(
      () =>
        !options().disabled &&
        !options().readOnly &&
        (options().min === undefined || value() === undefined || value()! > options().min!),
    ),
    initialize(next: number | undefined) {
      if (options().controlled) return
      internalValue.set(next)
      draft.set(formatter()(next, { userTyping: false, input: '' }))
    },
    input(text: string, event: Event) {
      editing = true
      draft.set(text)
      const next = parseInputNumber(text, parser())
      if (text.trim() === '' || next !== undefined) {
        setValue(next)
        options().onChange?.(event, next)
      }
    },
    blur(event: Event) {
      const before = value()
      const next = commit(parseInputNumber(draft(), parser()) ?? before)
      editing = false
      if (next !== before) options().onChange?.(event, next)
    },
    keydown(event: KeyboardEvent) {
      if (options().keyboard === false || options().disabled || options().readOnly) return
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()
        changeBy(event, event.key === 'ArrowUp' ? 'increment' : 'decrement')
      }
    },
    clear(event: Event) {
      commit(undefined)
      options().onChange?.(event, undefined)
    },
    increment: (event: Event) => changeBy(event, 'increment'),
    decrement: (event: Event) => changeBy(event, 'decrement'),
    commit,
  }
}
export type UseInputNumberReturn = ReturnType<typeof useInputNumber>
