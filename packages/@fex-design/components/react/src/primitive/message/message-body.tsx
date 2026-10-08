import { messageBodyClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function MessageBody({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} data-slot="message-body" className={cn(messageBodyClassName, className)} />
}
