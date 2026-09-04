import type { AnchorIndicatorStyle } from '@fex-design/core/anchor/dom'
import type { AnchorOrientation, AnchorRegisteredItem } from '@fex-design/core/anchor/types'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface AnchorContextValue {
  activeKeys: ComputedRef<readonly string[]>
  highlightedKeys: ComputedRef<ReadonlySet<string>>
  inkStyles: Ref<AnchorIndicatorStyle[]>
  orientation: ComputedRef<AnchorOrientation>
  root: Ref<HTMLElement | undefined>
  activate(item: AnchorRegisteredItem): void
  registerItem(item: AnchorRegisteredItem): () => void
}
export const anchorContextKey: InjectionKey<AnchorContextValue> = Symbol('Anchor')
export const anchorItemContextKey: InjectionKey<AnchorRegisteredItem> = Symbol('AnchorItem')
