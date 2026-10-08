import type { TreeSelectItem } from '@fex-design/core/tree-select/types'
import type { ChangeEvent, ReactNode } from 'react'
import {
  PopoverTrigger,
  type PopoverTriggerRenderProps,
} from '../popover'
import { useTreeSelect } from './tree-select-context'

export interface TreeSelectTriggerState<TNode = unknown> {
  triggerProps: PopoverTriggerRenderProps
  inputProps: {
    readOnly: boolean
    value: string
    onChange(event: ChangeEvent<HTMLInputElement>): void
    onFocus(): void
    onClick(): void
  }
  selectedItems: readonly TreeSelectItem<TNode>[]
  clear(): void
}

export interface TreeSelectTriggerProps<TNode = unknown> {
  children(state: TreeSelectTriggerState<TNode>): ReactNode
  displayValue?: ((items: readonly TreeSelectItem<TNode>[]) => string) | undefined
}

export function TreeSelectTrigger<TNode = unknown>({
  children,
  displayValue,
}: TreeSelectTriggerProps<TNode>) {
  const treeSelect = useTreeSelect<TNode>()
  const selectedText = displayValue
    ? displayValue(treeSelect.snapshot.selectedItems)
    : treeSelect.snapshot.selectedItems.map((item) => item.label).join(', ')
  return (
    <PopoverTrigger>
      {(triggerProps) =>
        children({
          triggerProps,
          inputProps: {
            readOnly: !treeSelect.searchable,
            value: treeSelect.snapshot.multiple
              ? treeSelect.searchValue
              : treeSelect.searchable && treeSelect.searchValue
                ? treeSelect.searchValue
                : selectedText,
            onChange: (event) => treeSelect.setSearchValue(event.currentTarget.value),
            onFocus: treeSelect.openPanel,
            onClick: treeSelect.openPanel,
          },
          selectedItems: treeSelect.snapshot.selectedItems,
          clear: () => {
            treeSelect.controller.clear()
            treeSelect.setSearchValue('')
          },
        })
      }
    </PopoverTrigger>
  )
}
