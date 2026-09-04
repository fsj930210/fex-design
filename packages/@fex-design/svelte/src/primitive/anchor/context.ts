import type { AnchorIndicatorStyle } from '@fex-design/core/anchor/dom'
import type { AnchorOrientation, AnchorRegisteredItem } from '@fex-design/core/anchor/types'
export interface AnchorContextValue { activeKeys(): readonly string[]; highlightedKeys(): ReadonlySet<string>; inkStyles(): readonly AnchorIndicatorStyle[]; orientation(): AnchorOrientation; activate(item: AnchorRegisteredItem): void; registerItem(item: AnchorRegisteredItem): () => void }
export const anchorContextKey = Symbol('Anchor')
export const anchorItemContextKey = Symbol('AnchorItem')
