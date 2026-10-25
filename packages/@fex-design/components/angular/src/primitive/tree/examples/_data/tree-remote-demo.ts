import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { treeDemoData } from './tree-demo'

export interface TreeSearchMatch {
  value: string
  label: string
}
export interface TreeAncestorResult {
  treeData: readonly TreeDataNode<string, string>[]
  expandedKeys: string[]
}
const respond = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), 300))

function shallow(node: TreeDataNode<string, string>): TreeDataNode<string, string> {
  const { children, ...rest } = node
  return { ...rest, isLeaf: !children?.length }
}
function findPath(
  nodes: readonly TreeDataNode<string, string>[],
  key: string,
): TreeDataNode<string, string>[] {
  for (const node of nodes) {
    if (node.key === key) return [node]
    const path = findPath(node.children ?? [], key)
    if (path.length) return [node, ...path]
  }
  return []
}
// Endpoint 1: root request or one level of children, never the complete tree.
export function loadRemoteTree(parentKey?: string) {
  const nodes = parentKey
    ? (findPath(treeDemoData, parentKey).at(-1)?.children ?? [])
    : treeDemoData
  return respond(nodes.map(shallow))
}
// Endpoint 2: matches share the exact identity and title of the source tree.
export function searchRemoteTree(keyword: string) {
  const query = keyword.trim().toLowerCase()
  const matches: TreeSearchMatch[] = []
  const visit = (nodes: readonly TreeDataNode<string, string>[]) => {
    for (const node of nodes) {
      if (query && String(node.title).toLowerCase().includes(query))
        matches.push({ value: node.key, label: String(node.title) })
      visit(node.children ?? [])
    }
  }
  visit(treeDemoData)
  return respond(matches)
}
// Endpoint 3: only the selected node and its direct ancestors.
export function loadRemoteAncestors(key: string): Promise<TreeAncestorResult> {
  const path = findPath(treeDemoData, key)
  let treeData: TreeDataNode<string, string>[] = []
  for (let index = path.length - 1; index >= 0; index--)
    treeData = [{ ...shallow(path[index]!), children: treeData, isLeaf: !treeData.length }]
  return respond({ treeData, expandedKeys: path.slice(0, -1).map((node) => node.key) })
}
export function updateRemoteChildren(
  nodes: readonly TreeDataNode<string, string>[],
  key: string,
  children: readonly TreeDataNode<string, string>[],
): readonly TreeDataNode<string, string>[] {
  let changed = false
  const result = nodes.map((node) => {
    if (node.key === key) {
      changed = true
      return { ...node, children, isLeaf: !children.length }
    }
    const nested = node.children && updateRemoteChildren(node.children, key, children)
    if (nested && nested !== node.children) {
      changed = true
      return { ...node, children: nested }
    }
    return node
  })
  return changed ? result : nodes
}
