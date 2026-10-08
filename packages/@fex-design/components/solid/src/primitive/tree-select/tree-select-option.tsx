import type { TreeSelectItem } from '@fex-design/core/tree-select/types'
import { createEffect, type JSX } from 'solid-js'
import { useTreeSelect } from './tree-select-context'

export interface TreeSelectOptionProps<TNode = unknown> {
  item: TreeSelectItem<TNode>
  toggle?: boolean
  closeOnSelect?: boolean
  clearSearchOnSelect?: boolean
  children(state: { selected: boolean; select(): void }): JSX.Element
}

export function TreeSelectOption<TNode = unknown>(props: TreeSelectOptionProps<TNode>) {
  const context = useTreeSelect<TNode>()
  createEffect(() => context.controller.registerItem(props.item))
  const select = () => {
    if (props.item.disabled) return
    if (props.toggle ?? context.snapshot().multiple) context.controller.toggle(props.item)
    else context.controller.select(props.item)
    if (props.clearSearchOnSelect ?? true) context.setSearchValue('')
    const shouldClose = props.closeOnSelect ?? !(props.toggle ?? context.snapshot().multiple)
    if (shouldClose) context.closePanel()
  }
  return props.children({
    get selected() {
      context.snapshot()
      return context.controller.isSelected(props.item.value)
    },
    select,
  })
}
