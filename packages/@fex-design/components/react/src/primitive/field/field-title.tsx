import { fieldTitleClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function FieldTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} data-slot="field-title" className={cn(fieldTitleClassName, className)} />
}
