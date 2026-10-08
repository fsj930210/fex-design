import { syncTextareaAutoSize, type TextareaAutoSize } from '@fex-design/core/textarea/autosize'
import {
  createContext,
  use,
  useRef,
  type ChangeEvent,
  type ComponentProps,
} from 'react'
import { useControllableState } from '@fex-design/react/hooks/use-controllable-state'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'

export type TextareaChangeReason = 'input' | 'clear'

export interface TextareaChangeMeta {
  reason: TextareaChangeReason
  event?: ChangeEvent<HTMLTextAreaElement> | undefined
}

export interface UseTextareaOptions {
  value?: string | undefined
  defaultValue?: string | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  invalid?: boolean | undefined
  autoSize?: TextareaAutoSize | undefined
  onChange?: ((value: string, meta: TextareaChangeMeta) => void) | undefined
  onClear?: ((meta: TextareaChangeMeta) => void) | undefined
}

export interface TextareaController {
  value: string
  disabled: boolean
  readOnly: boolean
  invalid: boolean
  canClear: boolean
  autoSize?: TextareaAutoSize | undefined
  focusRef: (element: HTMLTextAreaElement | null) => void
  setValue: (value: string, meta: TextareaChangeMeta) => void
  clear: () => void
  focus: () => void
  syncAutoSize: () => void
}

export function useTextarea({
  value,
  defaultValue = '',
  disabled = false,
  readOnly = false,
  invalid = false,
  autoSize,
  onChange,
  onClear,
}: UseTextareaOptions = {}): TextareaController {
  const elementRef = useRef<HTMLTextAreaElement | null>(null)
  const handleChange = useMemoizedFn((nextValue: string, meta?: TextareaChangeMeta) => {
    onChange?.(nextValue, meta ?? { reason: 'input' })
  })
  const [currentValue, setCurrentValue] = useControllableState<string>(
    { value, defaultValue, onChange: handleChange },
    { trigger: 'onChange' },
  )

  const syncAutoSize = useMemoizedFn(() => {
    if (elementRef.current) syncTextareaAutoSize(elementRef.current, autoSize)
  })

  const focusRef = useMemoizedFn((element: HTMLTextAreaElement | null) => {
    elementRef.current = element
    syncAutoSize()
  })

  const focus = useMemoizedFn(() => {
    elementRef.current?.focus()
  })

  const setValue = useMemoizedFn((nextValue: string, meta: TextareaChangeMeta) => {
    if (disabled || readOnly) return
    setCurrentValue(nextValue, meta)
  })

  const clear = useMemoizedFn(() => {
    if (currentValue === '' || disabled || readOnly) return
    const meta: TextareaChangeMeta = { reason: 'clear' }
    setCurrentValue('', meta)
    onClear?.(meta)
    focus()
  })

  return {
    value: currentValue,
    disabled,
    readOnly,
    invalid,
    canClear: currentValue !== '' && !disabled && !readOnly,
    autoSize,
    focusRef,
    setValue,
    clear,
    focus,
    syncAutoSize,
  }
}

export const TextareaContext = createContext<TextareaController | null>(null)

export function useTextareaContext(component: string) {
  const context = use(TextareaContext)
  if (!context) throw new Error(`${component} must be used inside TextareaRoot.`)
  return context
}

export type TextareaClearRenderProps = Omit<ComponentProps<'button'>, 'ref' | 'children'> & {
  'data-slot': 'textarea-clear'
}
