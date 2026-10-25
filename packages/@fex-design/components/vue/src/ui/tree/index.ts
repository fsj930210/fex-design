export { default as Tree } from './tree.vue'
export {
  expansionFeature,
  selectionFeature,
  checkFeature,
  asyncLoadFeature,
  dndFeature,
  keyboardFeature,
  searchFeature,
} from '@fex-design/vue/primitive/tree'
export { useTree, useTreeVisibleItems } from '@fex-design/vue/primitive/tree'
export type {
  TreeController,
  TreeDragEventContext,
  TreeItemEventContext,
  TreeKey,
  TreeDataNode,
  TreeNode,
  TreeOptions,
  TreeVisibleItem,
} from '@fex-design/vue/primitive/tree'

export type { TreeInstance, TreeScrollOptions } from './tree-instance'
export type { TreeBehaviorProps } from './tree-types'
