import { inputNumberActionsClassName } from '@fex-design/components-styles/input-number'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function InputNumberActions({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      {...props}
      data-slot="input-number-actions"
      className={cn(inputNumberActionsClassName, className)}
    />
  )
}
