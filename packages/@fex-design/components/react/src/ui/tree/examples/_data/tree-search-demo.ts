import { getTreeDemoChildren } from './tree-records'

import { treeDemoData } from './tree-demo'
export function getTreeSearchExpandedKeys(keyword: string): string[] {
  const value = keyword.trim().toLowerCase()
  if (!value) return []
  const expanded: string[] = []
  const visit = (node: Record<string, unknown>): boolean => {
    const childrenMatch = getTreeDemoChildren(node).map(visit).some(Boolean)
    const matched = String(node.title).toLowerCase().includes(value)
    if (getTreeDemoChildren(node).length && (matched || childrenMatch))
      expanded.push(String(node.key))
    return matched || childrenMatch
  }
  treeDemoData.forEach(visit)
  return expanded
}
export function splitTreeSearchTitle(input: unknown, keyword: string) {
  const title = String(input)
  const value = keyword.trim()
  const index = value ? title.toLowerCase().indexOf(value.toLowerCase()) : -1
  return index < 0
    ? { before: title, match: '', after: '' }
    : {
        before: title.slice(0, index),
        match: title.slice(index, index + value.length),
        after: title.slice(index + value.length),
      }
}
export function filterTreeDemoData(keyword: string): readonly Record<string, unknown>[] {
  const value = keyword.trim().toLowerCase()
  if (!value) return treeDemoData
  const visit = (nodes: readonly Record<string, unknown>[]): Record<string, unknown>[] =>
    nodes.flatMap((node) => {
      const children = visit(getTreeDemoChildren(node))
      return String(node.title).toLowerCase().includes(value) || children.length
        ? [{ ...node, ...(children.length ? { children } : {}) }]
        : []
    })
  return visit(treeDemoData)
}
