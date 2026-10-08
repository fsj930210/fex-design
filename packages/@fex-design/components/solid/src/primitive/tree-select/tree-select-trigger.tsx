import type { TreeSelectItem } from '@fex-design/core/tree-select/types'
import type { JSX } from 'solid-js'
import {
  PopoverTrigger,
  type PopoverTriggerRenderProps,
} from '../popover'
import { useTreeSelect } from './tree-select-context'

export interface TreeSelectTriggerState<TNode = unknown> {
  trigger: PopoverTriggerRenderProps
  inputProps: {
    readOnly: boolean
    value: string
    onInput(event: InputEvent & { currentTarget: HTMLInputElement }): void
    onFocus(): void
    onClick(): void
  }
  selectedItems: readonly TreeSelectItem<TNode>[]
  clear(): void
}

export function TreeSelectTrigger<TNode = unknown>(props: {
  children(state: TreeSelectTriggerState<TNode>): JSX.Element
}) {
  const context = useTreeSelect<TNode>()
  const inputProps = {
    get readOnly() {
      return !context.searchable()
    },
    get value() {
      const text = context
        .snapshot()
        .selectedItems.map((item) => item.label)
        .join(', ')
      return context.snapshot().multiple
        ? context.searchValue()
        : context.searchable() && context.searchValue()
          ? context.searchValue()
          : text
    },
    onInput: (event: InputEvent & { currentTarget: HTMLInputElement }) =>
      context.setSearchValue(event.currentTarget.value),
    onFocus: context.openPanel,
    onClick: context.openPanel,
  }
  return (
    <PopoverTrigger>
      {(trigger) =>
        props.children({
          trigger,
          inputProps,
          get selectedItems() {
            return context.snapshot().selectedItems
          },
          clear() {
            context.controller.clear()
            context.setSearchValue('')
          },
        })
      }
    </PopoverTrigger>
  )
}
