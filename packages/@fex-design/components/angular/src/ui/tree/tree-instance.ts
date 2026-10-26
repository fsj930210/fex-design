import type { TreeController } from './tree-internal-types'
import type { TreeKey, TreeNode } from '@fex-design/angular/primitive/tree'

export interface TreeScrollOptions {
  reveal?: boolean
  align?: 'auto' | 'start' | 'center' | 'end'
}
export interface TreeInstance<TNode extends Record<string, unknown> = Record<string, unknown>> {
  scrollTo(key: TreeKey, options?: TreeScrollOptions): boolean
  expand(key: TreeKey): void
  collapse(key: TreeKey): void
  expandAll(): void
  collapseAll(): void
  select(key: TreeKey): void
  unselect(key: TreeKey): void
  clearSelection(): void
  check(key: TreeKey): void
  uncheck(key: TreeKey): void
  clearChecked(): void
  getNode(key: TreeKey): Readonly<TreeNode<TNode>> | undefined
  getPath(key: TreeKey): TreeKey[]
  getTreeData(): readonly TNode[]
}
export interface TreeViewportInstance {
  scrollTo(key: TreeKey, options?: TreeScrollOptions): boolean
}
export function createTreeInstance<TNode extends Record<string, unknown>>(
  getTree: () => TreeController<TNode>,
  getViewport: () => TreeViewportInstance | undefined,
): TreeInstance<TNode> {
  const expansion = () =>
    getTree().getFeature<{
      expand(key: TreeKey): void
      collapse(key: TreeKey): void
      expandAll(): void
      collapseAll(): void
    }>('expansion')
  const selection = () =>
    getTree().getFeature<{
      select(key: TreeKey): void
      unselect(key: TreeKey): void
      clear(): void
    }>('selection')
  const check = () =>
    getTree().getFeature<{ check(key: TreeKey): void; uncheck(key: TreeKey): void; clear(): void }>(
      'check',
    )
  return {
    scrollTo(key, options) {
      if (!getTree().getItem(key)) return false
      return getViewport()?.scrollTo(key, options) ?? false
    },
    expand: (key) => expansion()?.expand(key),
    collapse: (key) => expansion()?.collapse(key),
    expandAll: () => expansion()?.expandAll(),
    collapseAll: () => expansion()?.collapseAll(),
    select: (key) => selection()?.select(key),
    unselect: (key) => selection()?.unselect(key),
    clearSelection: () => selection()?.clear(),
    check: (key) => check()?.check(key),
    uncheck: (key) => check()?.uncheck(key),
    clearChecked: () => check()?.clear(),
    getNode: (key) => getTree().getItem(key),
    getPath: (key) => getTree().getPath(key),
    getTreeData: () => getTree().getSnapshot().treeData,
  }
}
