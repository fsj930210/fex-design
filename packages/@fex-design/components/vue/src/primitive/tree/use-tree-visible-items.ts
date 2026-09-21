import type { TreeController, TreeNodeData } from '@fex-design/core/tree/types'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'

export function useTreeVisibleItems<TNode extends TreeNodeData>(tree: TreeController<TNode>) {
  return useCoreStore({
    getSnapshot: tree.getVisibleItems,
    subscribe: tree.subscribeVisible,
  })
}
