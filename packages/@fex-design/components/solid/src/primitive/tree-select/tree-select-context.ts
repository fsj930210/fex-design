import type { TreeSelectController } from '@fex-design/core/tree-select/types'
import { createContext, useContext, type Accessor } from 'solid-js'

export interface TreeSelectContextValue<TNode = unknown> {
  controller: TreeSelectController<TNode>
  snapshot: Accessor<ReturnType<TreeSelectController<TNode>['getSnapshot']>>
  searchable: Accessor<boolean>
  searchValue: Accessor<string>
  setSearchValue(value: string): void
  openPanel(): void
  closePanel(): void
}

export const TreeSelectContext = createContext<TreeSelectContextValue>()

export function useTreeSelect<TNode = unknown>() {
  const context = useContext(TreeSelectContext)
  if (!context) throw new Error('useTreeSelect must be used inside TreeSelectRoot.')
  return context as TreeSelectContextValue<TNode>
}
