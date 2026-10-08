import type { MessageGroupSpacing } from '@fex-design/core/message/types'
import { messageGroupClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export interface MessageGroupProps extends ComponentProps<'div'> {
  spacing?: MessageGroupSpacing
}

export function MessageGroup({ spacing = 'default', className, ...props }: MessageGroupProps) {
  return (
    <div
      {...props}
      data-slot="message-group"
      data-spacing={spacing}
      className={cn(messageGroupClassName({ spacing }), className)}
    />
  )
}
