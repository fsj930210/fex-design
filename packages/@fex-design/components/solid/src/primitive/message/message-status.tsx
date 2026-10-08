import type { MessageLive, MessageTone } from '@fex-design/core/message/types'
import { messageStatusClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export interface MessageStatusProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  tone?: MessageTone
  live?: MessageLive
}

export function MessageStatus(props: MessageStatusProps) {
  const [local, rest] = splitProps(props, ['tone', 'live', 'class'])
  const live = () => local.live ?? 'polite'
  return (
    <div
      {...rest}
      data-slot="message-status"
      data-tone={local.tone ?? 'neutral'}
      role={live() === 'off' ? undefined : 'status'}
      aria-live={live() === 'off' ? undefined : (live() as 'polite' | 'assertive')}
      class={cn(messageStatusClassName({ tone: local.tone ?? 'neutral' }), local.class)}
    />
  )
}
