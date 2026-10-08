import { createContext, useContext, type Accessor } from 'solid-js'
import type { getAnchorIndicatorStyles } from '@fex-design/core/anchor/dom'
import type {
  AnchorOrientation,
  AnchorRegisteredItem,
} from '@fex-design/core/anchor/types'

export interface AnchorApi {
  activeKeys: Accessor<readonly string[]>
  activate: (item: AnchorRegisteredItem) => void
  highlightedKeys: Accessor<Set<string>>
  inkStyles: Accessor<ReturnType<typeof getAnchorIndicatorStyles>>
  orientation: () => AnchorOrientation
  registerItem: (item: AnchorRegisteredItem) => () => void
  setRoot: (element: HTMLElement | undefined) => void
}

export const AnchorContext = createContext<AnchorApi>()
export const AnchorItemContext = createContext<AnchorRegisteredItem>()

export function useAnchorContext(name: string) {
  const context = useContext(AnchorContext)
  if (!context) throw new Error(`${name} must be used inside AnchorRoot`)
  return context
}
