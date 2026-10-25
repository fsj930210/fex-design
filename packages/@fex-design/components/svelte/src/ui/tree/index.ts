import Tree from './tree.svelte'
export { Tree }
export {
  expansionFeature,
  selectionFeature,
  checkFeature,
  asyncLoadFeature,
  dndFeature,
  keyboardFeature,
  searchFeature,
} from '@fex-design/svelte/primitive/tree'
export { createTreeStore } from '@fex-design/svelte/primitive/tree'
export type {
  TreeController,
  TreeDragEventContext,
  TreeItemEventContext,
  TreeKey,
  TreeDataNode,
  TreeNode,
  TreeOptions,
  TreeVisibleItem,
} from '@fex-design/svelte/primitive/tree'

export type { TreeInstance, TreeScrollOptions } from './tree-instance'
export type { TreeBehaviorProps } from './tree-types'
