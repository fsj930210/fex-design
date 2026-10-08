import type { MessageSide } from '@fex-design/core/message/types'
import { messageClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { MessageSideContext } from '../bubble/bubble-context'
import { MessageContext } from './message-context'

export interface MessageProps extends ComponentProps<'div'> {
  side?: MessageSide
  busy?: boolean
}

export function Message({
  side = 'start',
  busy = false,
  className,
  children,
  ...props
}: MessageProps) {
  return (
    <MessageContext value={{ side, busy }}>
      <MessageSideContext value={side}>
        <div
          {...props}
          data-slot="message"
          data-side={side}
          data-busy={busy ? 'true' : 'false'}
          aria-busy={busy}
          className={cn(messageClassName, className)}
        >
          {children}
        </div>
      </MessageSideContext>
    </MessageContext>
  )
}

export { Message as MessageRoot, type MessageProps as MessageRootProps }
