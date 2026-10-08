import { fieldSeparatorClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function FieldSeparator({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      role={props.role ?? 'separator'}
      data-slot="field-separator"
      className={cn(fieldSeparatorClassName, className)}
    />
  )
}
