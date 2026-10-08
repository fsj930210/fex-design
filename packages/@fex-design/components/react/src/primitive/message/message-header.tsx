import { messageHeaderClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function MessageHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} data-slot="message-header" className={cn(messageHeaderClassName, className)} />
  )
}
