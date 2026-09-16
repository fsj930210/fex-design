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
import { createEffect, createMemo, createSignal } from 'solid-js'

export interface UseInputNumberOptions extends InputNumberConstraints {
  controlled?: boolean
  value?: number
  defaultValue?: number
  parser?: InputNumberParser
  formatter?: InputNumberFormatter
  disabled?: boolean
  readOnly?: boolean
  keyboard?: boolean
  onChange?: (event: Event, value: number | undefined) => void
}

export function useInputNumber(options: () => UseInputNumberOptions) {
  const parser = () => options().parser ?? defaultInputNumberParser
  const formatter = () => options().formatter ?? defaultInputNumberFormatter
  const constraints = () => ({
    min: options().min,
    max: options().max,
    step: options().step,
    precision: options().precision,
  })
  const [internalValue, setInternalValue] = createSignal(options().defaultValue)
  const value = createMemo(() => (options().controlled ? options().value : internalValue()))
  const [draft, setDraft] = createSignal(formatter()(value(), { userTyping: false, input: '' }))
  let editing = false
  // Synchronize caller-owned controlled values into the editable text buffer outside active typing.
  createEffect(() => {
    const next = value()
    if (!editing) setDraft(formatter()(next, { userTyping: false, input: '' }))
  })
  const setValue = (next: number | undefined) => {
    if (!options().controlled) setInternalValue(next)
  }
  const commit = (next: number | undefined) => {
    const normalized = next === undefined ? undefined : normalizeInputNumber(next, constraints())
    setValue(normalized)
    setDraft(formatter()(normalized, { userTyping: false, input: draft() }))
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
    min: () => options().min,
    max: () => options().max,
    formattedValue: () => formatter()(value(), { userTyping: false, input: draft() }),
    outOfRange: () => isInputNumberOutOfRange(value(), constraints()),
    canClear: () => value() !== undefined && !options().disabled && !options().readOnly,
    canIncrement: () =>
      !options().disabled &&
      !options().readOnly &&
      (options().max === undefined || value() === undefined || value()! < options().max!),
    canDecrement: () =>
      !options().disabled &&
      !options().readOnly &&
      (options().min === undefined || value() === undefined || value()! > options().min!),
    input(text: string, event: Event) {
      editing = true
      setDraft(text)
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
