import type { TreeOptions, TreeDragEventContext } from './tree-internal-types'

export interface TreeBehaviorProps<TNode extends Record<string, unknown>> {
  disabled?: boolean | undefined
  selectable?: boolean | undefined
  checkable?: boolean | undefined
  disableCheckbox?: boolean | undefined
  draggable?: boolean | undefined
  droppable?: boolean | undefined
  treeData?: readonly TNode[] | undefined
  fieldNames?: TreeOptions<TNode>['fieldNames']
  isLeaf?: TreeOptions<TNode>['isLeaf']
  expandedKeys?: TreeOptions<TNode>['expandedKeys']
  defaultExpandedKeys?: TreeOptions<TNode>['defaultExpandedKeys']
  onExpand?: TreeOptions<TNode>['onExpandedKeysChange']
  selectedKeys?: TreeOptions<TNode>['selectedKeys']
  defaultSelectedKeys?: TreeOptions<TNode>['defaultSelectedKeys']
  multiple?: boolean | undefined
  onSelect?: TreeOptions<TNode>['onSelectedKeysChange']
  checkedKeys?: TreeOptions<TNode>['checkedKeys']
  defaultCheckedKeys?: TreeOptions<TNode>['defaultCheckedKeys']
  checkStrict?: boolean | undefined
  onCheck?: TreeOptions<TNode>['onCheckedKeysChange']
  loadChildren?: NonNullable<TreeOptions<TNode>['asyncLoader']>['loadChildren'] | undefined
  onLoadError?: NonNullable<TreeOptions<TNode>['asyncLoader']>['onLoadError'] | undefined
  indent?: number | undefined
  rowHeight?: number | undefined
  onDragStart?: ((context: TreeDragEventContext<TNode>) => void) | undefined
  onDragEnter?: ((context: TreeDragEventContext<TNode>) => void) | undefined
  onDragOver?: ((context: TreeDragEventContext<TNode>) => void) | undefined
  onDragLeave?: ((context: TreeDragEventContext<TNode>) => void) | undefined
  onDrop?: ((context: TreeDragEventContext<TNode>) => void) | undefined
  onDragEnd?: ((context: TreeDragEventContext<TNode>) => void) | undefined
}
