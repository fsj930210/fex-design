import type { MessageActionAlign } from '@fex-design/core/message/types'
import { messageActionsClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import { use, type HTMLAttributes } from 'react'
import { MessageContext } from './message-context'

export interface MessageActionsProps extends HTMLAttributes<HTMLDivElement> {
  align?: MessageActionAlign
  visibility?: 'always' | 'interaction'
}

export function MessageActions({
  align = 'inherit',
  visibility = 'always',
  className,
  ...props
}: MessageActionsProps) {
  const context = use(MessageContext)
  const resolvedAlign = align === 'inherit' ? (context?.side ?? 'start') : align
  return (
    <div
      {...props}
      data-slot="message-actions"
      data-align={resolvedAlign}
      data-visibility={visibility}
      className={cn(messageActionsClassName, className)}
    />
  )
}
