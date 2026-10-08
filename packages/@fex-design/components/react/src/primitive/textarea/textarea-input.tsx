import { textareaInputClassName } from '@fex-design/components-styles/textarea'
import { cn } from '@fex-design/utils'
import {
  useRef,
  type ChangeEvent,
  type ComponentProps,
  type Ref,
} from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useTextareaContext } from './textarea-context'

export interface TextareaInputProps extends Omit<ComponentProps<'textarea'>, 'value'> {
  ref?: Ref<HTMLTextAreaElement> | undefined
}

export function TextareaInput({
  className,
  disabled,
  readOnly,
  'aria-invalid': ariaInvalid,
  onChange,
  ref,
  ...props
}: TextareaInputProps) {
  const context = useTextareaContext('TextareaInput')
  const elementRef = useRef<HTMLTextAreaElement | null>(null)
  const setElementRef = useMemoizedFn((element: HTMLTextAreaElement | null) => {
    elementRef.current = element
  })
  const composedRef = useComposedRef(ref, setElementRef, context.focusRef)

  useIsomorphicLayoutEffect(() => {
    context.syncAutoSize()
  }, [context.value, context.autoSize, context.syncAutoSize])

  useIsomorphicLayoutEffect(() => {
    if (!context.autoSize || typeof ResizeObserver === 'undefined') return
    const element = elementRef.current
    if (!element) return
    const observer = new ResizeObserver(() => context.syncAutoSize())
    observer.observe(element)
    return () => observer.disconnect()
  }, [context.autoSize, context.syncAutoSize])

  return (
    <textarea
      {...props}
      ref={composedRef}
      value={context.value}
      disabled={context.disabled || disabled}
      readOnly={context.readOnly || readOnly}
      aria-invalid={ariaInvalid ?? (context.invalid || undefined)}
      data-slot="textarea-input"
      className={cn(textareaInputClassName, className)}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event)
        if (!event.defaultPrevented) {
          context.setValue(event.currentTarget.value, { reason: 'input', event })
        }
      }}
    />
  )
}
