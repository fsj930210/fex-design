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
import { createEffect, createMemo, createSignal, on } from 'solid-js'

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

export function useInputNumber(options: () => UseInputNumberOptions) {
  const parser = () => options().parser ?? defaultInputNumberParser
  const formatter = createMemo(() => options().formatter ?? defaultInputNumberFormatter)
  const constraints = () => ({
    min: options().min,
    max: options().max,
    step: options().step,
    precision: options().precision,
  })
  const [internalValue, setInternalValue] = createSignal(options().defaultValue)
  const controlled = createMemo(() => options().controlled ?? options().value !== undefined)
  const externalValue = createMemo(() => controlled() ? options().value : undefined)
  const value = createMemo(() => controlled() ? externalValue() : internalValue())
  const [draft, setDraft] = createSignal(formatter()(value(), { userTyping: false, input: '' }))
  const [userTyping, setUserTyping] = createSignal(false)
  // Synchronize caller-owned controlled values into the editable text buffer outside active typing.
  createEffect(on([controlled, externalValue, formatter], ([, , format]) => {
    if (!userTyping()) setDraft(format(value(), { userTyping: false, input: '' }))
  }))
  const setValue = (next: number | undefined) => {
    if (!controlled()) setInternalValue(next)
  }
  const commit = (next: number | undefined) => {
    const normalized = next === undefined ? undefined : normalizeInputNumber(next, constraints())
    setUserTyping(false)
    setValue(normalized)
    setDraft(formatter()(normalized, { userTyping: false, input: draft() }))
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
    userTyping,
    disabled: () => options().disabled ?? false,
    readOnly: () => options().readOnly ?? false,
    parseDraft: () => parseInputNumber(draft(), parser()),
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
      if (!canChangeInputNumber(options(), event)) return
      setUserTyping(true)
      setDraft(text)
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
      setUserTyping(false)
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
