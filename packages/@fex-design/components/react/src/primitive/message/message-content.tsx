import { messageContentClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function MessageContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      data-slot="message-content"
      className={cn(messageContentClassName, className)}
    />
  )
}
