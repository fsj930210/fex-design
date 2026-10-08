import type { TreeSelectItem } from '@fex-design/core/tree-select/types'
import type { ReactNode } from 'react'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { useTreeSelect } from './tree-select-context'

export interface TreeSelectOptionProps<TNode = unknown> {
  item: TreeSelectItem<TNode>
  toggle?: boolean | undefined
  closeOnSelect?: boolean | undefined
  clearSearchOnSelect?: boolean | undefined
  children(state: { selected: boolean; select(): void }): ReactNode
}

export function TreeSelectOption<TNode = unknown>({
  item,
  toggle,
  closeOnSelect,
  clearSearchOnSelect = true,
  children,
}: TreeSelectOptionProps<TNode>) {
  const treeSelect = useTreeSelect<TNode>()
  useIsomorphicLayoutEffect(
    () => treeSelect.controller.registerItem(item),
    [treeSelect.controller, item],
  )
  const select = () => {
    if (item.disabled) return
    if (toggle ?? treeSelect.snapshot.multiple) treeSelect.controller.toggle(item)
    else treeSelect.controller.select(item)
    if (clearSearchOnSelect) treeSelect.setSearchValue('')
    const shouldClose = closeOnSelect ?? !(toggle ?? treeSelect.snapshot.multiple)
    if (shouldClose) treeSelect.closePanel()
  }
  return children({ selected: treeSelect.controller.isSelected(item.value), select })
}
