import { createEffect, createUniqueId, onCleanup, splitProps, type JSX } from 'solid-js'
import { formLabelClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { createCoreStoreSignal } from '../../primitives/create-core-store-signal'
import { useFieldContext } from './context'
export type FormLabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
export function FormLabel(props: FormLabelProps) {
  const [local, rest] = splitProps(props, ['id', 'required', 'class', 'for'])
  const { association } = useFieldContext()
  const links = createCoreStoreSignal(association)
  const generated = `label-${createUniqueId()}`
  // aria-labelledby also covers custom composite controls.
  createEffect(() => onCleanup(association.register('labels', local.id ?? generated)))
  // This effect registers the label's DOM semantics and cleans up on required changes.
  createEffect(() => {
    if (local.required) onCleanup(association.require())
  })
  return (
    <label
      {...rest}
      id={local.id ?? generated}
      for={local.for ?? links().controlId}
      data-slot="form-label"
      data-required={local.required || undefined}
      class={cn(formLabelClassName, local.class)}
    />
  )
}
