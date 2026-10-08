import type { MessageSide } from '@fex-design/core/message/types'
import { messageClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { MessageSideContext } from '../bubble/bubble-context'
import { MessageContext } from './message-context'

export interface MessageProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  side?: MessageSide
  busy?: boolean
}

export function Message(props: MessageProps) {
  const [local, rest] = splitProps(props, ['side', 'busy', 'class', 'children'])
  const context = { side: () => local.side ?? 'start', busy: () => local.busy ?? false }
  return (
    <MessageContext.Provider value={context}>
      <MessageSideContext.Provider value={context.side}>
        <div
          {...rest}
          data-slot="message"
          data-side={context.side()}
          data-busy={context.busy() ? 'true' : 'false'}
          aria-busy={context.busy()}
          class={cn(messageClassName, local.class)}
        >
          {local.children}
        </div>
      </MessageSideContext.Provider>
    </MessageContext.Provider>
  )
}

export { Message as MessageRoot, type MessageProps as MessageRootProps }
