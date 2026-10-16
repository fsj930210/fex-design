import { createContext, use } from 'react'
import type { ScrollbarOverflow } from '@fex-design/core/scrollbar/types'

export type ScrollbarContextValue = {
  overflow?: ScrollbarOverflow | undefined
}

export const ScrollbarContext = createContext<ScrollbarContextValue>({})

export function useScrollbarContext() {
  return use(ScrollbarContext)
}
