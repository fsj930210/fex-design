import type { TreeOptions } from '@fex-design/angular/primitive/tree'
import {
  expansionFeature,
  selectionFeature,
  checkFeature,
  focusFeature,
  keyboardFeature,
  dndFeature,
  asyncLoadFeature,
} from '@fex-design/angular/primitive/tree'
import type { TreeBehaviorProps } from './tree-types'

const emptyTree: readonly never[] = []
/** One feature set per UI instance. Updates change configuration, never recreate state. */
export function createTreeSetup<TNode extends Record<string, unknown>>() {
  const features = [
    expansionFeature<TNode>(),
    selectionFeature<TNode>(),
    checkFeature<TNode>(),
    focusFeature<TNode>(),
    keyboardFeature<TNode>(),
    dndFeature<TNode>(),
    asyncLoadFeature<TNode>(),
  ]
  return (props: TreeBehaviorProps<TNode>): TreeOptions<TNode> => ({
    treeData: props.treeData ?? emptyTree,
    disabled: props.disabled,
    selectable: props.selectable,
    checkable: props.checkable ?? false,
    disableCheckbox: props.disableCheckbox,
    draggable: props.draggable ?? false,
    droppable: props.droppable ?? true,
    features,
    fieldNames: props.fieldNames,
    isLeaf: props.isLeaf,
    expandedKeys: props.expandedKeys,
    defaultExpandedKeys: props.defaultExpandedKeys,
    onExpandedKeysChange: props.onExpand,
    selectedKeys: props.selectedKeys,
    defaultSelectedKeys: props.defaultSelectedKeys,
    multiple: props.multiple,
    onSelectedKeysChange: props.onSelect,
    checkedKeys: props.checkedKeys,
    defaultCheckedKeys: props.defaultCheckedKeys,
    checkMode: props.checkStrict ? 'strict' : 'cascade',
    onCheckedKeysChange: props.onCheck,
    asyncLoader: props.loadChildren
      ? {
          loadChildren: props.loadChildren,
          ...(props.onLoadError ? { onLoadError: props.onLoadError } : {}),
        }
      : undefined,
  })
}
