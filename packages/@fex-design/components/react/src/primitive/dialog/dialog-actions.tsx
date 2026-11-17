import { dialogActionsClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export type DialogActionsProps = ComponentProps<'div'>

export function DialogActions({ className, ...props }: DialogActionsProps) {
  return (
    <div {...props} data-slot="dialog-actions" className={cn(dialogActionsClassName, className)} />
  )
}
