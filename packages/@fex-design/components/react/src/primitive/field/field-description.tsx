import { fieldDescriptionClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { useFieldContext } from './field-context'

export function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
  const context = useFieldContext('FieldDescription')
  return (
    <p
      {...props}
      id={props.id ?? context.descriptionId}
      data-slot="field-description"
      className={cn(fieldDescriptionClassName, className)}
    />
  )
}
