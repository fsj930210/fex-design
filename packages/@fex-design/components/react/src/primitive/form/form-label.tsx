import { useId, type ComponentProps } from 'react'
import { formLabelClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { useCoreStore } from '../../hooks/use-core-store'
import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect'
import { useFieldContext } from './context'

export type FormLabelProps = ComponentProps<'label'> & { required?: boolean }
export function FormLabel({ required = false, className, ...props }: FormLabelProps) {
  const { association } = useFieldContext()
  const generated = useId()
  const id = props.id ?? `label-${generated}`
  const links = useCoreStore(association)
  // Explicit label IDs also name non-native composite controls through aria-labelledby.
  useIsomorphicLayoutEffect(() => association.register('labels', id), [association, id])
  // Required belongs to this mounted semantic label; removing it removes the association.
  useIsomorphicLayoutEffect(
    () => (required ? association.require() : undefined),
    [association, required],
  )
  return (
    <label
      {...props}
      id={id}
      htmlFor={props.htmlFor ?? links.controlId}
      data-slot="form-label"
      data-required={required || undefined}
      className={cn(formLabelClassName, className)}
    />
  )
}
