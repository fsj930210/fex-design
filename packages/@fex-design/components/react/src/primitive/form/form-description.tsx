import { type ComponentProps, useId } from 'react'
import { formDescriptionClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect'
import { useFieldContext } from './context'

export function FormDescription({ className, ...props }: ComponentProps<'p'>) {
  const { association } = useFieldContext()
  const generated = useId()
  const id = props.id ?? `description-${generated}`
  // Register only mounted descriptions, never caller-maintained hasDescription flags.
  useIsomorphicLayoutEffect(() => association.register('descriptions', id), [association, id])
  return (
    <p
      {...props}
      id={id}
      data-slot="form-description"
      className={cn(formDescriptionClassName, className)}
    />
  )
}
