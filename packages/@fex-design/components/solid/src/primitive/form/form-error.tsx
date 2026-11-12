import {
  createEffect,
  createMemo,
  createUniqueId,
  For,
  onCleanup,
  Show,
  splitProps,
  type JSX,
} from 'solid-js'
import { getFormErrorMessages } from '@fex-design/core/form/error-messages'
import { formErrorClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { createFormBinding } from './create-form-binding'
export type FormErrorProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: (errors: readonly unknown[]) => JSX.Element
}
export function FormError(props: FormErrorProps) {
  const [local, rest] = splitProps(props, ['id', 'class', 'children'])
  const scope = createFormBinding()
  const generated = `error-${createUniqueId()}`
  const messages = createMemo(() => {
    const errors = scope.presentation().errors
    const normalized = getFormErrorMessages(errors)
    return normalized.length > 0 ? normalized : errors.map((error) => String(error))
  })
  const visible = () =>
    scope.presentation().errors.length > 0 && (!!local.children || messages().length > 0)
  // Register feedback only while its DOM branch is rendered.
  createEffect(() => {
    if (visible()) {
      const unregister = scope.association.register('errors', local.id ?? generated)
      if (typeof unregister === 'function') onCleanup(unregister)
    }
  })
  return (
    <Show when={visible()}>
      <div
        aria-live="polite"
        {...rest}
        id={local.id ?? generated}
        data-slot="form-error"
        class={cn(formErrorClassName, local.class)}
      >
        {local.children ? (
          local.children(scope.presentation().errors)
        ) : (
          <For each={messages()}>{(message) => <div>{message}</div>}</For>
        )}
      </div>
    </Show>
  )
}
