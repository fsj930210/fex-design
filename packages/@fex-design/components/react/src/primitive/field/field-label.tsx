import { fieldLabelClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { useFieldContext } from './field-context'

export function FieldLabel({ className, ...props }: ComponentProps<'label'>) {
  const context = useFieldContext('FieldLabel')
  return (
    <label
      {...props}
      htmlFor={props.htmlFor ?? context.controlId}
      data-slot="field-label"
      className={cn(fieldLabelClassName, className)}
    />
  )
}
