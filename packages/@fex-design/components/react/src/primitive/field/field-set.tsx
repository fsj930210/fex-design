import { fieldSetClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function FieldSet({ className, ...props }: ComponentProps<'fieldset'>) {
  return <fieldset {...props} data-slot="field-set" className={cn(fieldSetClassName, className)} />
}
