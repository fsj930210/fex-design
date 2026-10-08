import { messageFooterClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function MessageFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} data-slot="message-footer" className={cn(messageFooterClassName, className)} />
  )
}
