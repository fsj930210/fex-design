import { textareaInputClassName } from '@fex-design/components-styles/textarea'
import { cn } from '@fex-design/utils'
import {
  createEffect,
  onCleanup,
  splitProps,
  type JSX,
} from 'solid-js'
import { useTextareaContext } from './textarea-context'

export function TextareaInput(props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const context = useTextareaContext('TextareaInput')
  const [local, rest] = splitProps(props, [
    'class',
    'onInput',
    'ref',
    'disabled',
    'readOnly',
    'aria-invalid',
  ])
  let element: HTMLTextAreaElement | undefined

  createEffect(() => {
    context.value()
    context.autoSize()
    context.syncAutoSize()
  })
  createEffect(() => {
    if (!element || !context.autoSize() || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => context.syncAutoSize())
    observer.observe(element)
    onCleanup(() => observer.disconnect())
  })

  return (
    <textarea
      {...rest}
      ref={(node) => {
        element = node
        context.setFocusElement(node)
        if (typeof local.ref === 'function') local.ref(node)
      }}
      value={context.value()}
      disabled={context.disabled() || local.disabled}
      readOnly={context.readOnly() || local.readOnly}
      aria-invalid={local['aria-invalid'] ?? (context.invalid() || undefined)}
      data-slot="textarea-input"
      class={cn(textareaInputClassName, local.class)}
      onInput={(event) => {
        if (typeof local.onInput === 'function') local.onInput(event)
        if (!event.defaultPrevented) {
          context.setValue(event.currentTarget.value, 'input', event)
        }
      }}
    />
  )
}
