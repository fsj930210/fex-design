import { fieldRequiredIndicatorClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function FieldRequiredIndicator({
  className,
  children = '*',
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="field-required-indicator"
      className={cn(fieldRequiredIndicatorClassName, className)}
    >
      {children}
    </span>
  )
}
