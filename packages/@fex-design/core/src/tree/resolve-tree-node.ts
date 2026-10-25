import type { TreeKey, TreeNode, TreeNodeData, TreeOptions, TreeResolvedFieldNames } from './types'

export function resolveTreeFieldNames<T extends TreeNodeData>(
  options: TreeOptions<T>,
): TreeResolvedFieldNames {
  return {
    key: options.fieldNames?.key ?? 'key',
    title: options.fieldNames?.title ?? 'title',
    children: options.fieldNames?.children ?? 'children',
    isLeaf: options.fieldNames?.isLeaf ?? 'isLeaf',
    disabled: options.fieldNames?.disabled ?? 'disabled',
    selectable: options.fieldNames?.selectable ?? 'selectable',
    checkable: options.fieldNames?.checkable ?? 'checkable',
    disableCheckbox: options.fieldNames?.disableCheckbox ?? 'disableCheckbox',
    draggable: options.fieldNames?.draggable ?? 'draggable',
    droppable: options.fieldNames?.droppable ?? 'droppable',
  }
}

export function resolveTreeNode<T extends TreeNodeData>(
  data: T,
  location: {
    key: TreeKey
    parentKey: TreeKey | null
    depth: number
    index: number
    childrenKeys: readonly TreeKey[]
  },
  options: TreeOptions<T>,
): TreeNode<T> {
  const fields = resolveTreeFieldNames(options)
  const flag = (
    name: 'disabled' | 'selectable' | 'checkable' | 'disableCheckbox' | 'draggable' | 'droppable',
    fallback: boolean,
  ) => {
    const value = data[fields[name]]
    return typeof value === 'boolean' ? value : fallback
  }
  const disabled = options.disabled === true || flag('disabled', false)
  const explicitLeaf = data[fields.isLeaf]
  const node: TreeNode<T> = {
    ...location,
    data,
    title: data[fields.title] ?? location.key,
    isLeaf: typeof explicitLeaf === 'boolean' ? explicitLeaf : location.childrenKeys.length === 0,
    disabled,
    selectable: !disabled && flag('selectable', options.selectable ?? true),
    checkable: flag('checkable', options.checkable ?? true),
    disableCheckbox: disabled || flag('disableCheckbox', options.disableCheckbox ?? false),
    draggable: !disabled && flag('draggable', options.draggable ?? true),
    droppable: !disabled && flag('droppable', options.droppable ?? true),
  }
  if (typeof explicitLeaf !== 'boolean' && options.isLeaf)
    return { ...node, isLeaf: options.isLeaf(node) }
  return node
}

export function canCheckTreeNode(node: TreeNode<TreeNodeData> | undefined): boolean {
  return Boolean(node && !node.disabled && node.checkable && !node.disableCheckbox)
}

export function treeNodeOptionsChanged<T extends TreeNodeData>(
  previous: TreeOptions<T>,
  next: Partial<TreeOptions<T>>,
): boolean {
  return (
    [
      'disabled',
      'selectable',
      'checkable',
      'disableCheckbox',
      'draggable',
      'droppable',
      'isLeaf',
    ] as const
  ).some((key) => Object.hasOwn(next, key) && previous[key] !== next[key])
}
