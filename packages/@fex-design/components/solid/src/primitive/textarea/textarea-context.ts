import { syncTextareaAutoSize, type TextareaAutoSize } from '@fex-design/core/textarea/autosize'
import {
  createContext,
  createMemo,
  createSignal,
  useContext,
  type Accessor,
} from 'solid-js'

export type TextareaChangeReason = 'input' | 'clear'

export interface CreateTextareaOptions {
  value?: Accessor<string | undefined>
  defaultValue?: string | undefined
  disabled?: Accessor<boolean | undefined>
  readOnly?: Accessor<boolean | undefined>
  invalid?: Accessor<boolean | undefined>
  autoSize?: Accessor<TextareaAutoSize | undefined>
  onChange?:
    | ((value: string, meta: { reason: TextareaChangeReason; event?: InputEvent }) => void)
    | undefined
  onClear?: (() => void) | undefined
}

export function createTextarea(options: CreateTextareaOptions = {}) {
  const [internalValue, setInternalValue] = createSignal(options.defaultValue ?? '')
  let focusElement: HTMLTextAreaElement | undefined
  const value = createMemo(() => options.value?.() ?? internalValue())
  const disabled = createMemo(() => options.disabled?.() ?? false)
  const readOnly = createMemo(() => options.readOnly?.() ?? false)
  const invalid = createMemo(() => options.invalid?.() ?? false)
  const autoSize = createMemo(() => options.autoSize?.())
  const canClear = createMemo(() => value() !== '' && !disabled() && !readOnly())

  function syncAutoSize() {
    if (focusElement) syncTextareaAutoSize(focusElement, autoSize())
  }
  function setValue(nextValue: string, reason: TextareaChangeReason, event?: InputEvent) {
    if (disabled() || readOnly()) return
    if (options.value?.() === undefined) setInternalValue(nextValue)
    options.onChange?.(nextValue, { reason, ...(event === undefined ? {} : { event }) })
  }
  function clear() {
    if (!canClear()) return
    setValue('', 'clear')
    options.onClear?.()
    focusElement?.focus()
  }

  return {
    value,
    disabled,
    readOnly,
    invalid,
    autoSize,
    canClear,
    setValue,
    clear,
    focus: () => focusElement?.focus(),
    setFocusElement: (element: HTMLTextAreaElement) => {
      focusElement = element
      syncAutoSize()
    },
    syncAutoSize,
  }
}

export const useTextarea = createTextarea

export type TextareaContextValue = ReturnType<typeof createTextarea>
export const TextareaContext = createContext<TextareaContextValue>()

export function useTextareaContext(name: string) {
  const context = useContext(TextareaContext)
  if (!context) throw new Error(`${name} must be used inside TextareaRoot.`)
  return context
}
