import { createEffect, createUniqueId, onCleanup, splitProps, type JSX } from 'solid-js'
import { formDescriptionClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { useFieldContext } from './context'
export function FormDescription(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  const [local, rest] = splitProps(props, ['id', 'class'])
  const { association } = useFieldContext()
  const generated = `description-${createUniqueId()}`
  // Register the mounted node's ID; reactive changes detach the previous association.
  createEffect(() => onCleanup(association.register('descriptions', local.id ?? generated)))
  return (
    <p
      {...rest}
      id={local.id ?? generated}
      data-slot="form-description"
      class={cn(formDescriptionClassName, local.class)}
    />
  )
}
