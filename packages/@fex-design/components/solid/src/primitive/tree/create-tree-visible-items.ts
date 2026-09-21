import type { TreeController, TreeNodeData } from '@fex-design/core/tree/types'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'

export function createTreeVisibleItems<TNode extends TreeNodeData>(tree: TreeController<TNode>) {
  return createCoreStoreSignal({
    getSnapshot: tree.getVisibleItems,
    subscribe: tree.subscribeVisible,
  })
}
