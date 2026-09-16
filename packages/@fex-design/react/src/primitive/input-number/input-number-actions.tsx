import { inputNumberActionsClassName } from '@fex-design/styles/input-number'
import { cn } from '@fex/utils'
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
