import type { MessageSide } from '@fex-design/core/message/types'
import { createContext, useContext, type Accessor } from 'solid-js'

export interface MessageContextValue {
  side: Accessor<MessageSide>
  busy: Accessor<boolean>
}

export const MessageContext = createContext<MessageContextValue>()

export function useMessageContext() {
  const context = useContext(MessageContext)
  return context
}
