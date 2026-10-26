import type { TreeKey, TreeNode, TreeNodeData, TreeOptions, TreeVisibleItem } from './types'
import { resolveTreeNode } from './resolve-tree-node'
export interface TreeIndex<TNode extends TreeNodeData> {
  items: Map<TreeKey, TreeNode<TNode>>
  childrenByKey: Map<TreeKey | null, TreeKey[]>
  parentByKey: Map<TreeKey, TreeKey | null>
}
export function buildTreeIndex<TNode extends TreeNodeData>(
  treeData: readonly TNode[],
  options: TreeOptions<TNode>,
  getKey: (node: TNode) => TreeKey,
  getChildren: (node: TNode) => readonly TNode[],
): TreeIndex<TNode> {
  const items = new Map<TreeKey, TreeNode<TNode>>()
  const childrenByKey = new Map<TreeKey | null, TreeKey[]>()
  const parentByKey = new Map<TreeKey, TreeKey | null>()

  const visit = (
    nodes: readonly TNode[],
    parentKey: TreeKey | null,
    depth: number,
    keys: TreeKey[],
  ) => {
    nodes.forEach((node, itemIndex) => {
      const key = keys[itemIndex]!
      if (items.has(key)) throw new Error(`Tree node key "${String(key)}" is duplicated.`)
      const children = getChildren(node)
      const childrenKeys = children.map(getKey)
      parentByKey.set(key, parentKey)
      items.set(
        key,
        resolveTreeNode(
          node,
          {
            key,
            parentKey,
            depth,
            index: itemIndex,
            childrenKeys,
          },
          options,
        ),
      )
      visit(children, key, depth + 1, childrenKeys)
    })
    childrenByKey.set(parentKey, keys)
  }

  visit(treeData, null, 0, treeData.map(getKey))
  return { items, childrenByKey, parentByKey }
}

export function buildVisibleTreeItems<TNode extends TreeNodeData>(
  index: TreeIndex<TNode>,
  expandedKeys: readonly TreeKey[],
) {
  const expanded = new Set(expandedKeys)
  const visible: TreeVisibleItem<TNode>[] = []
  const visit = (key: TreeKey) => {
    const item = index.items.get(key)
    if (!item) return
    visible.push({ ...item, visibleIndex: visible.length })
    if (expanded.has(key) && !item.isLeaf) {
      for (const childKey of index.childrenByKey.get(key) ?? []) visit(childKey)
    }
  }
  for (const key of index.childrenByKey.get(null) ?? []) visit(key)
  return visible
}

export function refreshTreeCapabilities<T extends TreeNodeData>(
  index: TreeIndex<T>,
  options: TreeOptions<T>,
): TreeIndex<T> {
  const items = new Map<TreeKey, TreeNode<T>>()
  for (const [key, node] of index.items) items.set(key, resolveTreeNode(node.data, node, options))
  return { ...index, items }
}
export function getTreeAncestors<T extends TreeNodeData>(
  index: TreeIndex<T>,
  key: TreeKey,
): TreeKey[] {
  const keys: TreeKey[] = []
  let parent = index.parentByKey.get(key)
  while (parent !== undefined && parent !== null) {
    keys.push(parent)
    parent = index.parentByKey.get(parent)
  }
  return keys
}
export function getTreeDescendants<T extends TreeNodeData>(
  index: TreeIndex<T>,
  key: TreeKey,
): TreeKey[] {
  const keys: TreeKey[] = []
  const visit = (parent: TreeKey) => {
    for (const child of index.childrenByKey.get(parent) ?? []) {
      keys.push(child)
      visit(child)
    }
  }
  visit(key)
  return keys
}

/** A relationship check only needs the target's ancestor chain, never the source subtree. */
export function isTreeAncestor<T extends TreeNodeData>(
  ancestor: TreeKey,
  key: TreeKey | null,
  getItem: (key: TreeKey) => TreeNode<T> | undefined,
): boolean {
  while (key !== null) {
    if (key === ancestor) return true
    key = getItem(key)?.parentKey ?? null
  }
  return false
}
