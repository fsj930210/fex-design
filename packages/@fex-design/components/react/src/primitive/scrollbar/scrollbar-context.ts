import { createContext, use } from 'react'

export type Overflow = 'auto' | 'hidden'
export type ScrollbarContextValue = {
  rootRef: { current: HTMLDivElement | null }
  overflow?: { x?: Overflow; y?: Overflow } | undefined
}

export const ScrollbarContext = createContext<ScrollbarContextValue | null>(null)

export function useScrollbarContext() {
  const context = use(ScrollbarContext)
  if (!context) throw new Error('Scrollbar parts must be used inside ScrollbarRoot.')
  return context
}
