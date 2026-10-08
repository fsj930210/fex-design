import { fieldErrorClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { For, Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import { useFieldContext } from './field-context'

export function FieldError(
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { errors?: readonly JSX.Element[] }>,
) {
  const context = useFieldContext('FieldError')
  const [local, rest] = splitProps(props, ['id', 'class', 'children', 'errors'])
  return (
    <Show when={local.children ?? local.errors?.length}>
      <div
        {...rest}
        id={local.id ?? context.errorId}
        role="alert"
        aria-live="polite"
        data-slot="field-error"
        class={cn(fieldErrorClassName, local.class)}
      >
        {local.children ?? <For each={local.errors}>{(error) => <div>{error}</div>}</For>}
      </div>
    </Show>
  )
}
