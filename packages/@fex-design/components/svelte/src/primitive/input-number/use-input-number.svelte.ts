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
export function useInputNumber(getOptions: () => UseInputNumberOptions) {
  const initialValue = getOptions().defaultValue
  let internalValue = $state(initialValue)
  const initialDraft = (getOptions().formatter ?? defaultInputNumberFormatter)(
    getOptions().value ?? initialValue,
    {
      userTyping: false,
      input: '',
    },
  )
  let draft = $state(initialDraft)
  let editing = false
  const value = () => (getOptions().controlled ? getOptions().value : internalValue)
  const parser = () => getOptions().parser ?? defaultInputNumberParser
  const formatter = () => getOptions().formatter ?? defaultInputNumberFormatter
  const constraints = () => ({
    min: getOptions().min,
    max: getOptions().max,
    step: getOptions().step,
    precision: getOptions().precision,
  })
  // Synchronize caller-owned controlled values into the editable text buffer outside active typing.
  $effect(() => {
    const next = value()
    if (!editing) draft = formatter()(next, { userTyping: false, input: '' })
  })
  const setValue = (next: number | undefined) => {
    if (!getOptions().controlled) internalValue = next
  }
  const commit = (next: number | undefined) => {
    const normalized = next === undefined ? undefined : normalizeInputNumber(next, constraints())
    setValue(normalized)
    draft = formatter()(normalized, { userTyping: false, input: draft })
    return normalized
  }
  const changeBy = (event: Event, direction: 'increment' | 'decrement') => {
    const next = commit(
      stepInputNumber(parseInputNumber(draft, parser()) ?? value(), direction, constraints()),
    )
    getOptions().onChange?.(event, next)
  }
  return {
    value,
    get draft() {
      return draft
    },
    min: () => getOptions().min,
    max: () => getOptions().max,
    formattedValue: () => formatter()(value(), { userTyping: false, input: draft }),
    outOfRange: () => isInputNumberOutOfRange(value(), constraints()),
    canClear: () => value() !== undefined && !getOptions().disabled && !getOptions().readOnly,
    canIncrement: () =>
      !getOptions().disabled &&
      !getOptions().readOnly &&
      (getOptions().max === undefined || value() === undefined || value()! < getOptions().max!),
    canDecrement: () =>
      !getOptions().disabled &&
      !getOptions().readOnly &&
      (getOptions().min === undefined || value() === undefined || value()! > getOptions().min!),
    input(text: string, event: Event) {
      editing = true
      draft = text
      const next = parseInputNumber(text, parser())
      if (text.trim() === '' || next !== undefined) {
        setValue(next)
        getOptions().onChange?.(event, next)
      }
    },
    blur(event: Event) {
      const before = value()
      const next = commit(parseInputNumber(draft, parser()) ?? before)
      editing = false
      if (next !== before) getOptions().onChange?.(event, next)
    },
    keydown(event: KeyboardEvent) {
      if (getOptions().keyboard === false || getOptions().disabled || getOptions().readOnly) return
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()
        changeBy(event, event.key === 'ArrowUp' ? 'increment' : 'decrement')
      }
    },
    clear(event: Event) {
      commit(undefined)
      getOptions().onChange?.(event, undefined)
    },
    increment: (event: Event) => changeBy(event, 'increment'),
    decrement: (event: Event) => changeBy(event, 'decrement'),
    commit,
  }
}
export type UseInputNumberReturn = ReturnType<typeof useInputNumber>
