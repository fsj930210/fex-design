import {
  defaultInputNumberFormatter,
  defaultInputNumberParser,
  isInputNumberOutOfRange,
  normalizeInputNumber,
  parseInputNumber,
  stepInputNumber,
} from '@fex-design/core/input-number/value'
import type {
  InputNumberConstraints,
  InputNumberFormatter,
  InputNumberParser,
} from '@fex-design/core/input-number/types'
import { useState, type KeyboardEvent } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useMemoizedFn } from '../../hooks/use-memoized-fn'
import useUpdateEffect from '../../hooks/use-update-effect'

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

export function useInputNumber(options: UseInputNumberOptions = {}) {
  const {
    value,
    defaultValue,
    parser = defaultInputNumberParser,
    formatter = defaultInputNumberFormatter,
    disabled = false,
    readOnly = false,
    keyboard = true,
    onChange,
  } = options
  const constraints: InputNumberConstraints = {
    min: options.min,
    max: options.max,
    step: options.step,
    precision: options.precision,
  }
  const [currentValue, setCurrentValue] = useControllableState<number | undefined>(
    { value, defaultValue },
    { trigger: 'onChange', isControlled: () => options.controlled ?? value !== undefined },
  )
  const format = useMemoizedFn(
    (nextValue: number | undefined, userTyping: boolean, input: string) =>
      formatter(nextValue, { userTyping, input }),
  )
  const [draft, setDraft] = useState(() => format(currentValue, false, ''))
  const [userTyping, setUserTyping] = useState(false)

  // The editable text buffer follows external controlled values only while the user is not typing.
  useUpdateEffect(() => {
    if (!userTyping) setDraft(format(currentValue, false, draft))
  }, [currentValue, format, userTyping])

  const parse = useMemoizedFn((text: string) => parseInputNumber(text, parser))
  const input = useMemoizedFn((text: string, event: Event) => {
    setUserTyping(true)
    setDraft(text)
    const nextValue = parse(text)
    if (text.trim() === '' || nextValue !== undefined) {
      setCurrentValue(nextValue)
      onChange?.(event, nextValue)
    }
    return nextValue
  })
  const commit = useMemoizedFn((nextValue: number | undefined) => {
    const normalized =
      nextValue === undefined ? undefined : normalizeInputNumber(nextValue, constraints)
    setCurrentValue(normalized)
    setUserTyping(false)
    setDraft(format(normalized, false, draft))
    return normalized
  })
  const stepBy = useMemoizedFn((direction: 'increment' | 'decrement') =>
    commit(stepInputNumber(parse(draft) ?? currentValue, direction, constraints)),
  )
  const clear = useMemoizedFn(() => commit(undefined))

  const changeBy = useMemoizedFn((event: Event, direction: 'increment' | 'decrement') => {
    const next = stepBy(direction)
    onChange?.(event, next)
    return next
  })

  const blur = useMemoizedFn((event: Event) => {
    const before = currentValue
    const next = commit(parse(draft) ?? before)
    if (next !== before) onChange?.(event, next)
  })

  const keydown = useMemoizedFn((event: KeyboardEvent<HTMLInputElement>) => {
    if (!keyboard || disabled || readOnly) return
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      changeBy(event.nativeEvent, event.key === 'ArrowUp' ? 'increment' : 'decrement')
    }
  })

  return {
    value: currentValue,
    min: options.min,
    max: options.max,
    draft,
    formattedValue: format(currentValue, false, draft),
    userTyping,
    disabled,
    readOnly,
    outOfRange: isInputNumberOutOfRange(currentValue, constraints),
    canClear: currentValue !== undefined && !disabled && !readOnly,
    canIncrement:
      !disabled &&
      !readOnly &&
      (options.max === undefined || currentValue === undefined || currentValue < options.max),
    canDecrement:
      !disabled &&
      !readOnly &&
      (options.min === undefined || currentValue === undefined || currentValue > options.min),
    input,
    commit,
    increment: (event: Event) => changeBy(event, 'increment'),
    decrement: (event: Event) => changeBy(event, 'decrement'),
    clear: (event?: Event) => {
      const next = clear()
      if (event) onChange?.(event, next)
      return next
    },
    blur,
    keydown,
    parseDraft: () => parse(draft),
  }
}

export type UseInputNumberReturn = ReturnType<typeof useInputNumber>
