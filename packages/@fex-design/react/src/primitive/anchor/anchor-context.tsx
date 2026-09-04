import { createContext, use } from 'react'
import type { AnchorApi } from './use-anchor'
import type { AnchorRegisteredItem } from '@fex-design/core/anchor/types'

export interface AnchorContextValue extends AnchorApi {
  parentKey?: string
}

export const AnchorContext = createContext<AnchorContextValue | null>(null)
export const AnchorItemContext = createContext<AnchorRegisteredItem | null>(null)

export function useAnchorContext(component: string) {
  const context = use(AnchorContext)
  if (!context) throw new Error(`${component} must be used inside AnchorRoot`)
  return context
}
