import { textareaClearClassName } from '@fex-design/components-styles/textarea'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { Show } from 'solid-js'
import { XIcon } from '@fex-design/solid/icons/x'
import { Button } from '../button/button'
import { useTextareaContext } from './textarea-context'

export function TextareaClear(
  props: ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>> & { forceMount?: boolean },
) {
  const context = useTextareaContext('TextareaClear')
  const [local, rest] = splitProps(props, [
    'forceMount',
    'class',
    'children',
    'onPointerDown',
    'onClick',
  ])
  return (
    <Show when={local.forceMount || context.canClear()}>
      <Button
        {...rest}
        type="button"
        aria-label={rest['aria-label'] ?? 'Clear textarea'}
        data-slot="textarea-clear"
        disabled={!local.forceMount && !context.canClear()}
        class={cn(textareaClearClassName, local.class)}
        onPointerDown={(event) => {
          if (typeof local.onPointerDown === 'function') local.onPointerDown(event)
          if (!event.defaultPrevented) event.preventDefault()
        }}
        onClick={(event) => {
          if (typeof local.onClick === 'function') local.onClick(event)
          if (!event.defaultPrevented) context.clear()
        }}
      >
        {local.children ?? <XIcon />}
      </Button>
    </Show>
  )
}
