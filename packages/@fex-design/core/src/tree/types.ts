import type { TreeFeatureRegistration } from './feature-types'
import type { TreeDropIntent } from './features/dnd'

export type TreeKey = string | number

export type TreeNodeData = Record<string, unknown>

/** Optional capabilities on source nodes; explicit false overrides tree defaults. */
interface TreeNodeCapabilities {
  disabled?: boolean | undefined
  selectable?: boolean | undefined
  checkable?: boolean | undefined
  disableCheckbox?: boolean | undefined
  draggable?: boolean | undefined
  droppable?: boolean | undefined
}

export interface TreeFieldNames {
  key?: string | undefined
  title?: string | undefined
  children?: string | undefined
  isLeaf?: string | undefined
  disabled?: string | undefined
  selectable?: string | undefined
  checkable?: string | undefined
  disableCheckbox?: string | undefined
  draggable?: string | undefined
  droppable?: string | undefined
}

export interface TreeResolvedFieldNames {
  key: string
  title: string
  children: string
  isLeaf: string
  disabled: string
  selectable: string
  checkable: string
  disableCheckbox: string
  draggable: string
  droppable: string
}

export interface TreeNode<TNode extends TreeNodeData = TreeNodeData> {
  readonly key: TreeKey
  readonly data: TNode
  readonly title: unknown
  readonly childrenKeys: readonly TreeKey[]
  readonly parentKey: TreeKey | null
  readonly depth: number
  readonly index: number
  readonly isLeaf: boolean
  readonly disabled: boolean
  readonly selectable: boolean
  readonly checkable: boolean
  readonly disableCheckbox: boolean
  readonly draggable: boolean
  readonly droppable: boolean
}

export interface TreeVisibleItem<TNode extends TreeNodeData> extends TreeNode<TNode> {
  visibleIndex: number
}

export interface TreeItemEventContext<TNode extends TreeNodeData> {
  item: TreeNode<TNode>
  event?: Event | undefined
}

export interface TreeDragEventContext<
  TNode extends TreeNodeData,
> extends TreeItemEventContext<TNode> {
  sourceItem?: TreeNode<TNode> | undefined
  targetItem?: TreeNode<TNode> | undefined
  intent?: TreeDropIntent | null | undefined
}

export interface TreeDndCallbacks<TNode extends TreeNodeData> {
  onDragStart?: (context: TreeDragEventContext<TNode>) => void
  onDragEnter?: (context: TreeDragEventContext<TNode>) => void
  onDragOver?: (context: TreeDragEventContext<TNode>) => void
  onDragLeave?: (context: TreeDragEventContext<TNode>) => void
  onDrop?: (context: TreeDragEventContext<TNode>) => void
  onDragEnd?: (context: TreeDragEventContext<TNode>) => void
}

export type TreeCheckMode = 'cascade' | 'strict'
export type TreeCheckedState = boolean | 'indeterminate'
export type TreeLoadState = 'unloaded' | 'loading' | 'loaded' | 'error'

export interface TreeChangeMeta {
  changedKeys: readonly TreeKey[]
}

export interface TreeOptions<TNode extends TreeNodeData> extends TreeNodeCapabilities {
  treeData: readonly TNode[]
  features?: readonly TreeFeatureRegistration<TNode>[] | undefined
  fieldNames?: TreeFieldNames | undefined
  isLeaf?: ((node: Readonly<TreeNode<TNode>>) => boolean) | undefined
  checkMode?: TreeCheckMode | undefined
  asyncLoader?: TreeAsyncLoaderOptions<TNode> | undefined

  expandedKeys?: readonly TreeKey[] | undefined
  defaultExpandedKeys?: readonly TreeKey[] | undefined
  onExpandedKeysChange?: ((keys: readonly TreeKey[], meta: TreeChangeMeta) => void) | undefined

  selectedKeys?: readonly TreeKey[] | undefined
  defaultSelectedKeys?: readonly TreeKey[] | undefined
  multiple?: boolean | undefined
  onSelectedKeysChange?: ((keys: readonly TreeKey[], meta: TreeChangeMeta) => void) | undefined

  checkedKeys?: readonly TreeKey[] | undefined
  defaultCheckedKeys?: readonly TreeKey[] | undefined
  onCheckedKeysChange?: ((keys: readonly TreeKey[], meta: TreeChangeMeta) => void) | undefined

  focusedKey?: TreeKey | null | undefined
  defaultFocusedKey?: TreeKey | null | undefined
  onFocusedKeyChange?: ((key: TreeKey | null) => void) | undefined
}

export interface TreeAsyncLoaderOptions<TNode extends TreeNodeData> {
  loadChildren: (item: TreeNode<TNode>, context: { signal: AbortSignal }) => Promise<void>
  onLoadError?: (error: unknown, key: TreeKey) => void
}

export interface TreeSnapshot<TNode extends TreeNodeData> {
  treeData: readonly TNode[]
  expandedKeys: readonly TreeKey[]
  selectedKeys: readonly TreeKey[]
  checkedKeys: readonly TreeKey[]
  focusedKey: TreeKey | null
  items: ReadonlyMap<TreeKey, TreeNode<TNode>>
  visibleItems: readonly TreeVisibleItem<TNode>[]
}

export interface TreeSearchSubtreeOptions<TNode extends TreeNodeData> {
  keyword: string
  filterTreeNode: (node: TNode, keyword: string) => boolean
}

export interface TreeController<TNode extends TreeNodeData> {
  getSnapshot(): TreeSnapshot<TNode>
  subscribe(listener: () => void): () => void
  subscribeNode(key: TreeKey, listener: () => void): () => void
  subscribeVisible(listener: () => void): () => void
  subscribeSelector<T>(
    selector: (snapshot: TreeSnapshot<TNode>) => T,
    listener: () => void,
    isEqual?: (left: T, right: T) => boolean,
  ): () => void
  hasFeature(id: string): boolean
  getFeature<TApi>(id: string): TApi | undefined
  updateOptions(options: Partial<TreeOptions<TNode>>): void

  getItem(key: TreeKey): TreeNode<TNode> | undefined
  getPath(key: TreeKey): TreeKey[]
  getVisibleItems(): readonly TreeVisibleItem<TNode>[]
  getVisibleCount(): number
  getVisibleItemAt(index: number): TreeVisibleItem<TNode> | undefined
  getVisibleIndex(key: TreeKey): number | undefined
}
