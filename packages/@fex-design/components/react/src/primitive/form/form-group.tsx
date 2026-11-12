import type { ComponentProps } from 'react'
import { formGroupClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { useRootContext } from './context'

export function FormGroup({ className, ...props }: ComponentProps<'fieldset'>) {
  useRootContext()
  return (
    <fieldset {...props} data-slot="form-group" className={cn(formGroupClassName, className)} />
  )
}
