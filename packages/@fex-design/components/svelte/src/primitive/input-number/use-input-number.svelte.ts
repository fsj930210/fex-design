import { untrack } from 'svelte'
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
export function useInputNumber(getOptions: () => UseInputNumberOptions) {
  const initialValue = getOptions().defaultValue
  let internalValue = $state(initialValue)
  const initialDraft = (getOptions().formatter ?? defaultInputNumberFormatter)(
    (getOptions().controlled ?? getOptions().value !== undefined) ? getOptions().value : initialValue,
    {
      userTyping: false,
      input: '',
    },
  )
  let draft = $state(initialDraft)
  let editing = $state(false)
  const controlled = $derived(getOptions().controlled ?? getOptions().value !== undefined)
  const externalValue = $derived(controlled ? getOptions().value : undefined)
  const currentValue = $derived(controlled ? externalValue : internalValue)
  const value = () => currentValue
  const parser = () => getOptions().parser ?? defaultInputNumberParser
  const currentFormatter = $derived(getOptions().formatter ?? defaultInputNumberFormatter)
  const formatter = () => currentFormatter
  const constraints = () => ({
    min: getOptions().min,
    max: getOptions().max,
    step: getOptions().step,
    precision: getOptions().precision,
  })
  // Synchronize caller-owned controlled values into the editable text buffer outside active typing.
  $effect(() => {
    const next = controlled ? externalValue : untrack(value)
    const format = formatter()
    if (!untrack(() => editing)) draft = untrack(() => format(next, { userTyping: false, input: '' }))
  })
  const setValue = (next: number | undefined) => {
    if (!controlled) internalValue = next
  }
  const commit = (next: number | undefined) => {
    const normalized = next === undefined ? undefined : normalizeInputNumber(next, constraints())
    editing = false
    setValue(normalized)
    draft = formatter()(normalized, { userTyping: false, input: draft })
    return normalized
  }
  const changeBy = (event: Event, direction: 'increment' | 'decrement') => {
    if (!canChangeInputNumber(getOptions(), event)) return
    if (!canStepInputNumber(value(), direction, constraints())) return
    const next = commit(
      stepInputNumber(parseInputNumber(draft, parser()) ?? value(), direction, constraints()),
    )
    getOptions().onChange?.(event, next)
    return next
  }
  return {
    userTyping: () => editing,
    disabled: () => getOptions().disabled ?? false,
    readOnly: () => getOptions().readOnly ?? false,
    parseDraft: () => parseInputNumber(draft, parser()),
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
      if (!canChangeInputNumber(getOptions(), event)) return
      editing = true
      draft = text
      const next = parseInputNumber(text, parser())
      if (text.trim() === '' || next !== undefined) {
        setValue(next)
        getOptions().onChange?.(event, next)
      }
      return next
    },
    blur(event: Event) {
      if (!canChangeInputNumber(getOptions(), event)) return
      const before = value()
      const next = commit(parseInputNumber(draft, parser()) ?? before)
      editing = false
      if (next !== before) getOptions().onChange?.(event, next)
    },
    keydown(event: KeyboardEvent) {
      if (getOptions().keyboard === false || !canChangeInputNumber(getOptions(), event)) return
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        changeBy(event, event.key === 'ArrowUp' ? 'increment' : 'decrement')
        event.preventDefault()
      }
    },
    clear(event?: Event) {
      if (!canChangeInputNumber(getOptions(), event)) return
      const next = commit(undefined)
      if (event) getOptions().onChange?.(event, next)
      return next
    },
    increment: (event: Event) => changeBy(event, 'increment'),
    decrement: (event: Event) => changeBy(event, 'decrement'),
    commit,
  }
}
export type UseInputNumberReturn = ReturnType<typeof useInputNumber>
