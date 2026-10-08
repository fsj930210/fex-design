import {
  type BubbleSize,
  type BubbleVariant,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { createContext, useContext, type Accessor } from 'solid-js'

export type BubbleContextValue = {
  side: Accessor<ConversationSide>
  size: Accessor<BubbleSize>
  variant: Accessor<BubbleVariant>
}

export const BubbleContext = createContext<BubbleContextValue>()
export const MessageSideContext = createContext<Accessor<ConversationSide>>()

export function useBubbleContext() {
  return useContext(BubbleContext)
}
