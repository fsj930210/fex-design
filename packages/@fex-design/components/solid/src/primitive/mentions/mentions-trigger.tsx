import { createMemo, splitProps, type JSX } from 'solid-js'
import { TextareaInput, TextareaRoot } from '../textarea'
import { useMentionsContext } from './mentions-context'
import { useMentions } from './use-mentions'

function getSelection(element: HTMLTextAreaElement | undefined) {
  return { start: element?.selectionStart ?? 0, end: element?.selectionEnd ?? 0 }
}

export interface MentionsTriggerRenderProps {
  props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
  state: ReturnType<typeof useMentions>
  ref: (element: HTMLTextAreaElement) => void
}

export interface MentionsTriggerProps extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  rootClass?: string
  children?: (input: MentionsTriggerRenderProps) => JSX.Element
}

export function MentionsTrigger(props: MentionsTriggerProps) {
  const context = useMentionsContext('MentionsTrigger')
  const [local, rest] = splitProps(props, [
    'children',
    'class',
    'rootClass',
    'onInput',
    'onKeyDown',
    'onClick',
    'onSelect',
    'onFocus',
    'onBlur',
    'ref',
  ])
  let element: HTMLTextAreaElement | undefined
  let composing = false
  const mentions = useMentions()
  const syncSelection = () => context.controller.setSelection(getSelection(element))
  const setElement = (node: HTMLTextAreaElement) => {
    element = node
    if (typeof local.ref === 'function') local.ref(node)
  }
  const triggerProps = createMemo<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>>(() => ({
    ...rest,
    value: context.snapshot().value,
    disabled: context.disabled(),
    readOnly: context.readOnly(),
    required: context.required(),
    role: 'combobox',
    'aria-expanded': context.snapshot().open,
    'aria-controls': context.listId,
    'aria-activedescendant':
      context.snapshot().activeKey === undefined
        ? undefined
        : context.listId + '-' + context.snapshot().activeKey,
    'aria-invalid': context.invalid() || undefined,
    'aria-required': context.required() || undefined,
    onInput: (event) => {
      if (typeof local.onInput === 'function') local.onInput(event)
      if (!event.defaultPrevented)
        context.controller.setValue(event.currentTarget.value, getSelection(event.currentTarget))
    },
    onKeyDown: (event) => {
      if (typeof local.onKeyDown === 'function') local.onKeyDown(event)
      if (event.defaultPrevented || composing) return
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        context.controller.setOpen(true, 'keyboard')
        context.controller.moveActive(event.key === 'ArrowDown' ? 1 : -1)
      } else if ((event.key === 'Enter' || event.key === 'Tab') && context.snapshot().open) {
        if (context.controller.selectActive()) event.preventDefault()
      } else if (event.key === 'Escape') context.controller.setOpen(false, 'escape')
    },
    onClick: (event) => {
      if (typeof local.onClick === 'function') local.onClick(event)
      if (!event.defaultPrevented) syncSelection()
    },
    onSelect: (event) => {
      if (typeof local.onSelect === 'function') local.onSelect(event)
      if (!event.defaultPrevented) syncSelection()
    },
    onFocus: (event) => {
      if (typeof local.onFocus === 'function') local.onFocus(event)
      if (!event.defaultPrevented) syncSelection()
    },
    onBlur: (event) => {
      if (typeof local.onBlur === 'function') local.onBlur(event)
      if (!event.defaultPrevented) context.controller.setOpen(false, 'blur')
    },
    onCompositionStart: () => {
      composing = true
    },
    onCompositionEnd: (event) => {
      composing = false
      context.controller.setValue(event.currentTarget.value, getSelection(event.currentTarget))
    },
  }))

  if (local.children)
    return local.children({ props: triggerProps(), state: mentions, ref: setElement })

  return (
    <TextareaRoot
      class={local.rootClass}
      value={context.snapshot().value}
      disabled={context.disabled()}
      readOnly={context.readOnly()}
      invalid={context.invalid()}
      onChange={(value) => context.controller.setValue(value, getSelection(element))}
    >
      <TextareaInput {...triggerProps()} ref={setElement} class={local.class} />
    </TextareaRoot>
  )
}
