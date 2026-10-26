import { getTreeDemoChildren } from './tree-records'

import { treeDemoData } from './tree-demo'

export interface TreeSearchMatch {
  value: string
  label: string
}
export interface TreeAncestorResult {
  treeData: readonly Record<string, unknown>[]
  expandedKeys: string[]
}
const respond = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), 300))

function shallow(node: Record<string, unknown>): Record<string, unknown> {
  const { children, ...rest } = node
  return { ...rest, isLeaf: !getTreeDemoChildren(node).length }
}
function findPath(
  nodes: readonly Record<string, unknown>[],
  key: string,
): Record<string, unknown>[] {
  for (const node of nodes) {
    if (node.key === key) return [node]
    const path = findPath(getTreeDemoChildren(node), key)
    if (path.length) return [node, ...path]
  }
  return []
}
// Endpoint 1: root request or one level of children, never the complete tree.
export function loadRemoteTree(parentKey?: string) {
  const nodes = parentKey
    ? getTreeDemoChildren(findPath(treeDemoData, parentKey).at(-1) ?? {})
    : treeDemoData
  return respond(nodes.map(shallow))
}
// Endpoint 2: matches share the exact identity and title of the source tree.
export function searchRemoteTree(keyword: string) {
  const query = keyword.trim().toLowerCase()
  const matches: TreeSearchMatch[] = []
  const visit = (nodes: readonly Record<string, unknown>[]) => {
    for (const node of nodes) {
      if (query && String(node.title).toLowerCase().includes(query))
        matches.push({ value: String(node.key), label: String(node.title) })
      visit(getTreeDemoChildren(node))
    }
  }
  visit(treeDemoData)
  return respond(matches)
}
// Endpoint 3: only the selected node and its direct ancestors.
export function loadRemoteAncestors(key: string): Promise<TreeAncestorResult> {
  const path = findPath(treeDemoData, key)
  let treeData: Record<string, unknown>[] = []
  for (let index = path.length - 1; index >= 0; index--)
    treeData = [{ ...shallow(path[index]!), children: treeData, isLeaf: !treeData.length }]
  return respond({ treeData, expandedKeys: path.slice(0, -1).map((node) => String(node.key)) })
}
export function updateRemoteChildren(
  nodes: readonly Record<string, unknown>[],
  key: string,
  children: readonly Record<string, unknown>[],
): readonly Record<string, unknown>[] {
  let changed = false
  const result = nodes.map((node) => {
    if (node.key === key) {
      changed = true
      return { ...node, children, isLeaf: !children.length }
    }
    const nested = getTreeDemoChildren(node).length
      ? updateRemoteChildren(getTreeDemoChildren(node), key, children)
      : undefined
    if (nested && nested !== node.children) {
      changed = true
      return { ...node, children: nested }
    }
    return node
  })
  return changed ? result : nodes
}
