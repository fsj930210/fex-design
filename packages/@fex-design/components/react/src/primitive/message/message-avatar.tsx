import { messageAvatarClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function MessageAvatar({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} data-slot="message-avatar" className={cn(messageAvatarClassName, className)} />
  )
}
