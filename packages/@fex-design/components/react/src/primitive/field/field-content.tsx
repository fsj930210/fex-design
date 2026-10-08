import { fieldContentClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function FieldContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} data-slot="field-content" className={cn(fieldContentClassName, className)} />
  )
}
