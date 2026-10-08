import {
  type BubbleSize,
  type BubbleVariant,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { createContext, use } from 'react'

export type BubbleContextValue = { side: ConversationSide; size: BubbleSize; variant: BubbleVariant }
export const BubbleContext = createContext<BubbleContextValue | null>(null)
export const MessageSideContext = createContext<ConversationSide | null>(null)

export function useBubbleContext() {
  return use(BubbleContext)
}
