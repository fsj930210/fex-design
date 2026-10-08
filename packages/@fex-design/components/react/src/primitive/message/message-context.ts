import type { MessageSide } from '@fex-design/core/message/types'
import { createContext, use } from 'react'

export interface MessageContextValue {
  side: MessageSide
  busy: boolean
}

export const MessageContext = createContext<MessageContextValue | null>(null)

export function useMessageContext() {
  return use(MessageContext)
}
