import type { MessageLive, MessageTone } from '@fex-design/core/message/types'
import { messageStatusClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export interface MessageStatusProps extends ComponentProps<'div'> {
  tone?: MessageTone
  live?: MessageLive
}

export function MessageStatus({
  tone = 'neutral',
  live = 'polite',
  className,
  ...props
}: MessageStatusProps) {
  return (
    <div
      {...props}
      data-slot="message-status"
      data-tone={tone}
      role={live === 'off' ? undefined : 'status'}
      aria-live={live === 'off' ? undefined : live}
      className={cn(messageStatusClassName({ tone }), className)}
    />
  )
}
