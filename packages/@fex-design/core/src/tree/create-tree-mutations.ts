import { buildVisibleTreeItems } from './tree-index'
import type {
  TreeController,
  TreeNodeData,
  TreeOptions,
  TreeSnapshot,
  TreeKey,
  TreeMutationResult,
  TreeInsertInput,
  TreeMoveInput,
} from './types'
import type { TreeIndex } from './tree-index'
import { resolveTreeNode } from './resolve-tree-node'
import { uniqueKeys, failMutation } from './tree-utils'

interface MutationContext<TNode extends TreeNodeData> {
  getOptions(): TreeOptions<TNode>
  getIndex(): TreeIndex<TNode>
  setIndex(index: TreeIndex<TNode>): void
  getSnapshot(): TreeSnapshot<TNode>
  setSnapshot(snapshot: TreeSnapshot<TNode>, keys: readonly TreeKey[], visible: boolean): void
  buildSnapshot(
    data: readonly TNode[],
    expanded: readonly TreeKey[],
    selected: readonly TreeKey[],
    checked: readonly TreeKey[],
    focused: TreeKey | null,
  ): TreeSnapshot<TNode>
  getFieldNames(): import('./types').TreeResolvedFieldNames
  getKey(node: TNode): TreeKey
  getChildren(node: TNode): readonly TNode[]
  getAncestorKeys(key: TreeKey): readonly TreeKey[]
  getDescendantKeys(key: TreeKey): readonly TreeKey[]
}
export function createTreeMutations<TNode extends TreeNodeData>(
  context: MutationContext<TNode>,
): Pick<
  TreeController<TNode>,
  'updateNode' | 'insertNode' | 'removeNode' | 'moveNode' | 'replaceChildren'
> {
  const {
    getSnapshot,
    setSnapshot,
    buildSnapshot,
    getFieldNames,
    getKey,
    getChildren,
    getAncestorKeys,
    getDescendantKeys,
  } = context
  function updateTreeNode(
    nodes: readonly TNode[],
    key: TreeKey,
    update: (node: TNode) => TNode,
  ): readonly TNode[] {
    // oxlint-disable-next-line unicorn/no-array-reverse -- getAncestorKeys returns a fresh array and the workspace targets ES2022.
    const path = [...[...getAncestorKeys(key)].reverse(), key]
    const updateAtDepth = (currentNodes: readonly TNode[], depth: number): readonly TNode[] => {
      const item = context.getIndex().items.get(path[depth] as TreeKey)
      if (!item) return currentNodes
      const currentNode = currentNodes[item.index]
      if (!currentNode || getKey(currentNode) !== item.key) return currentNodes

      let nextNode: TNode
      if (depth === path.length - 1) {
        nextNode = update(currentNode)
      } else {
        const children = getChildren(currentNode)
        const nextChildren = updateAtDepth(children, depth + 1)
        if (nextChildren === children) return currentNodes
        nextNode = { ...currentNode, [getFieldNames().children]: nextChildren }
      }
      if (nextNode === currentNode) return currentNodes
      const nextNodes = [...currentNodes]
      nextNodes[item.index] = nextNode
      return nextNodes
    }
    return updateAtDepth(nodes, 0)
  }

  function removeTreeNode(nodes: readonly TNode[], key: TreeKey): readonly TNode[] {
    let changed = false
    const nextNodes: TNode[] = []
    for (const node of nodes) {
      if (getKey(node) === key) {
        changed = true
        continue
      }
      const children = getChildren(node)
      const nextChildren = children.length > 0 ? removeTreeNode(children, key) : children
      if (nextChildren !== children) {
        changed = true
        nextNodes.push({ ...node, [getFieldNames().children]: nextChildren })
      } else {
        nextNodes.push(node)
      }
    }
    return changed ? nextNodes : nodes
  }

  function insertTreeNode(
    nodes: readonly TNode[],
    input: TreeInsertInput<TNode>,
  ): readonly TNode[] | undefined {
    if (input.parentKey === null) {
      const nextNodes = [...nodes]
      nextNodes.splice(
        Math.max(0, Math.min(input.index ?? nextNodes.length, nextNodes.length)),
        0,
        input.node,
      )
      return nextNodes
    }
    let inserted = false
    const nextNodes = nodes.map((node) => {
      if (getKey(node) === input.parentKey) {
        inserted = true
        const children = [...getChildren(node)]
        children.splice(
          Math.max(0, Math.min(input.index ?? children.length, children.length)),
          0,
          input.node,
        )
        return { ...node, [getFieldNames().children]: children }
      }
      const children = getChildren(node)
      if (children.length === 0) return node
      const nextChildren = insertTreeNode(children, input)
      if (!nextChildren) return node
      inserted = true
      return { ...node, [getFieldNames().children]: nextChildren }
    })
    return inserted ? nextNodes : undefined
  }

  function commitTreeData(treeData: readonly TNode[], mutation: TreeMutationResult) {
    const current = getSnapshot()
    const next = buildSnapshot(
      treeData,
      current.expandedKeys,
      current.selectedKeys,
      current.checkedKeys,
      current.focusedKey,
    )
    setSnapshot(next, mutation.changedKeys, true)
    context.getOptions().onTreeDataChange?.(treeData, mutation)
    return mutation
  }

  function commitNodeUpdate(
    key: TreeKey,
    nextNode: TNode,
    nextTreeData: readonly TNode[],
    mutation: TreeMutationResult,
  ) {
    const item = context.getIndex().items.get(key)
    const childrenField = getFieldNames().children
    if (!item || getKey(nextNode) !== key || nextNode[childrenField] !== item.data[childrenField]) {
      return commitTreeData(nextTreeData, mutation)
    }

    const nextItems = new Map(context.getIndex().items)
    let nodes = nextTreeData
    const path = [...[...getAncestorKeys(key)].reverse(), key]
    for (const pathKey of path) {
      const previous = nextItems.get(pathKey)!
      const data = nodes[previous.index]!
      nextItems.set(pathKey, resolveTreeNode(data, previous, context.getOptions()))
      nodes = getChildren(data)
    }
    context.setIndex({ ...context.getIndex(), items: nextItems })
    const current = getSnapshot()
    const visibleItems = buildVisibleTreeItems(context.getIndex(), current.expandedKeys)
    setSnapshot({ ...current, treeData: nextTreeData, items: nextItems, visibleItems }, path, true)
    context.getOptions().onTreeDataChange?.(nextTreeData, mutation)
    return mutation
  }

  function updateNode(
    key: TreeKey,
    patch: Partial<TNode> | ((node: TNode) => TNode),
  ): TreeMutationResult {
    const item = context.getIndex().items.get(key)
    if (!item) return failMutation('update', 'Tree node was not found.')
    const nextNode = typeof patch === 'function' ? patch(item.data) : { ...item.data, ...patch }
    const nextTreeData = updateTreeNode(getSnapshot().treeData, key, () => nextNode)
    if (nextTreeData === getSnapshot().treeData) {
      return { ok: true, type: 'update', changedKeys: [] }
    }
    return commitNodeUpdate(key, nextNode, nextTreeData, {
      ok: true,
      type: 'update',
      changedKeys: [key],
    })
  }

  function insertNode(input: TreeInsertInput<TNode>): TreeMutationResult {
    const key = getKey(input.node)
    if (context.getIndex().items.has(key))
      return failMutation('insert', 'Tree node key already exists.')
    const nextTreeData = insertTreeNode(getSnapshot().treeData, input)
    if (!nextTreeData) return failMutation('insert', 'Parent node was not found.')
    return commitTreeData(nextTreeData, {
      ok: true,
      type: 'insert',
      changedKeys: uniqueKeys([key, ...(input.parentKey === null ? [] : [input.parentKey])]),
    })
  }

  function removeNode(key: TreeKey): TreeMutationResult {
    const item = context.getIndex().items.get(key)
    if (!item) return failMutation('remove', 'Tree node was not found.')
    const removedKeys = [key, ...getDescendantKeys(key)]
    const nextTreeData = removeTreeNode(getSnapshot().treeData, key)
    return commitTreeData(nextTreeData, {
      ok: true,
      type: 'remove',
      changedKeys: uniqueKeys([
        ...(item.parentKey === null ? [] : [item.parentKey]),
        ...getAncestorKeys(key),
      ]),
      removedKeys,
    })
  }

  function moveNode(input: TreeMoveInput): TreeMutationResult {
    const source = context.getIndex().items.get(input.sourceKey)
    if (!source) return failMutation('move', 'Source node was not found.')
    if (input.parentKey !== null && !context.getIndex().items.has(input.parentKey)) {
      return failMutation('move', 'Target parent was not found.')
    }
    if (
      input.parentKey === input.sourceKey ||
      (input.parentKey !== null && getDescendantKeys(input.sourceKey).includes(input.parentKey))
    ) {
      return failMutation('move', 'Cannot move a node into its descendant.')
    }
    const withoutSource = removeTreeNode(getSnapshot().treeData, input.sourceKey)
    const nextTreeData = insertTreeNode(withoutSource, {
      parentKey: input.parentKey,
      index: input.index,
      node: source.data,
    })
    if (!nextTreeData) return failMutation('move', 'Target parent was not found.')
    return commitTreeData(nextTreeData, {
      ok: true,
      type: 'move',
      changedKeys: uniqueKeys([
        input.sourceKey,
        ...(source.parentKey === null ? [] : [source.parentKey]),
        ...(input.parentKey === null ? [] : [input.parentKey]),
      ]),
    })
  }

  function replaceChildren(
    parentKey: TreeKey | null,
    children: readonly TNode[],
  ): TreeMutationResult {
    if (parentKey === null) {
      return commitTreeData(children, {
        ok: true,
        type: 'replace-children',
        changedKeys: children.map(getKey),
      })
    }
    if (!context.getIndex().items.has(parentKey)) {
      return failMutation('replace-children', 'Parent node was not found.')
    }
    const nextTreeData = updateTreeNode(getSnapshot().treeData, parentKey, (node) => ({
      ...node,
      [getFieldNames().children]: children,
    }))
    return commitTreeData(nextTreeData, {
      ok: true,
      type: 'replace-children',
      changedKeys: uniqueKeys([parentKey, ...children.map(getKey)]),
    })
  }
  return { updateNode, insertNode, removeNode, moveNode, replaceChildren }
}
