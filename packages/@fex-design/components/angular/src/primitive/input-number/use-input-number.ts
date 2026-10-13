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
import { computed, effect, signal, untracked, type Signal } from '@angular/core'
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
  const controlled = computed(() => options().controlled ?? options().value !== undefined)
  const externalValue = computed(() => controlled() ? options().value : undefined)
  const value = computed(() => controlled() ? externalValue() : internalValue())
  const draft = signal(
    (options().formatter ?? defaultInputNumberFormatter)(value(), { userTyping: false, input: '' }),
  )
  const parser = () => options().parser ?? defaultInputNumberParser
  const formatter = computed(() => options().formatter ?? defaultInputNumberFormatter)
  const constraints = () => ({
    min: options().min,
    max: options().max,
    step: options().step,
    precision: options().precision,
  })
  const userTyping = signal(false)
  // Synchronize caller-owned controlled values into the editable text buffer outside active typing.
  effect(() => {
    const next = controlled() ? externalValue() : untracked(value)
    const format = formatter()
    if (!untracked(userTyping)) draft.set(untracked(() => format(next, { userTyping: false, input: '' })))
  })
  const setValue = (next: number | undefined) => {
    if (!controlled()) internalValue.set(next)
  }
  const commit = (next: number | undefined) => {
    const normalized = next === undefined ? undefined : normalizeInputNumber(next, constraints())
    userTyping.set(false)
    setValue(normalized)
    draft.set(formatter()(normalized, { userTyping: false, input: draft() }))
    return normalized
  }
  const changeBy = (event: Event, direction: 'increment' | 'decrement') => {
    if (!canChangeInputNumber(options(), event)) return
    if (!canStepInputNumber(value(), direction, constraints())) return
    const next = commit(
      stepInputNumber(parseInputNumber(draft(), parser()) ?? value(), direction, constraints()),
    )
    options().onChange?.(event, next)
    return next
  }
  return {
    userTyping: userTyping.asReadonly(),
    disabled: computed(() => options().disabled ?? false),
    readOnly: computed(() => options().readOnly ?? false),
    parseDraft: () => parseInputNumber(draft(), parser()),
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
      if (controlled()) return
      internalValue.set(next)
      draft.set(formatter()(next, { userTyping: false, input: '' }))
    },
    input(text: string, event: Event) {
      if (!canChangeInputNumber(options(), event)) return
      userTyping.set(true)
      draft.set(text)
      const next = parseInputNumber(text, parser())
      if (text.trim() === '' || next !== undefined) {
        setValue(next)
        options().onChange?.(event, next)
      }
      return next
    },
    blur(event: Event) {
      if (!canChangeInputNumber(options(), event)) return
      const before = value()
      const next = commit(parseInputNumber(draft(), parser()) ?? before)
      userTyping.set(false)
      if (next !== before) options().onChange?.(event, next)
    },
    keydown(event: KeyboardEvent) {
      if (options().keyboard === false || !canChangeInputNumber(options(), event)) return
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        changeBy(event, event.key === 'ArrowUp' ? 'increment' : 'decrement')
        event.preventDefault()
      }
    },
    clear(event?: Event) {
      if (!canChangeInputNumber(options(), event)) return
      const next = commit(undefined)
      if (event) options().onChange?.(event, next)
      return next
    },
    increment: (event: Event) => changeBy(event, 'increment'),
    decrement: (event: Event) => changeBy(event, 'decrement'),
    commit,
  }
}
export type UseInputNumberReturn = ReturnType<typeof useInputNumber>
