import { createTreeSelectController } from '@fex-design/core/tree-select/create-tree-select-controller'
import type {
  TreeSelectController,
  TreeSelectItem,
  TreeSelectValue,
} from '@fex-design/core/tree-select/types'
import {
  createEffect,
  createSignal,
  splitProps,
  type ParentProps,
} from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import {
  Popover,
  type PopoverProps,
} from '../popover'
import { TreeSelectContext } from './tree-select-context'

export interface TreeSelectRootProps<TNode = unknown>
  extends ParentProps, Omit<PopoverProps, 'children'> {
  controller?: TreeSelectController<TNode> | undefined
  items?: readonly TreeSelectItem<TNode>[] | undefined
  value?: TreeSelectValue | readonly TreeSelectValue[] | undefined
  defaultValue?: TreeSelectValue | readonly TreeSelectValue[] | undefined
  multiple?: boolean | undefined
  disabled?: boolean | undefined
  searchable?: boolean | undefined
  searchValue?: string | undefined
  defaultSearchValue?: string | undefined
  onSearchValueChange?: ((value: string) => void) | undefined
  onChange?:
    | ((value: TreeSelectValue | TreeSelectValue[] | undefined, meta: unknown) => void)
    | undefined
}

export function TreeSelectRoot<TNode = unknown>(props: TreeSelectRootProps<TNode>) {
  const [local, popover] = splitProps(props, [
    'children',
    'controller',
    'items',
    'value',
    'defaultValue',
    'multiple',
    'disabled',
    'searchable',
    'searchValue',
    'defaultSearchValue',
    'onSearchValueChange',
    'onChange',
  ])
  const owned = createTreeSelectController<TNode>({
    get items() {
      return local.items
    },
    get value() {
      return local.value
    },
    get defaultValue() {
      return local.defaultValue
    },
    get multiple() {
      return local.multiple
    },
    get disabled() {
      return local.disabled
    },
    onChange(value, meta) {
      local.onChange?.(value, meta)
    },
  })
  const controller = local.controller ?? owned
  const snapshot = createCoreStoreSignal(controller)
  const [localSearch, setLocalSearch] = createSignal(local.defaultSearchValue ?? '')
  const [localOpen, setLocalOpen] = createSignal(popover.defaultOpen ?? false)
  const searchValue = () => local.searchValue ?? localSearch()
  const setSearchValue = (value: string) => {
    if (local.searchValue === undefined) setLocalSearch(value)
    local.onSearchValueChange?.(value)
  }
  createEffect(() =>
    controller.updateOptions({
      items: local.items,
      value: local.value,
      multiple: local.multiple,
      disabled: local.disabled,
    }),
  )
  const resolvedOpen = () => popover.open ?? localOpen()
  const requestOpen = (value: boolean) => {
    if (popover.open === undefined) setLocalOpen(value)
    popover.onOpenChange?.(value, { source: 'trigger' } as never)
  }
  return (
    <TreeSelectContext.Provider
      value={{
        controller,
        snapshot,
        searchable: () => local.searchable === true,
        searchValue,
        setSearchValue,
        openPanel: () => requestOpen(true),
        closePanel: () => requestOpen(false),
      }}
    >
      <Popover
        {...popover}
        open={resolvedOpen()}
        trigger={popover.trigger ?? []}
        onOpenChange={(value, info) => {
          if (popover.open === undefined) setLocalOpen(value)
          popover.onOpenChange?.(value, info)
        }}
      >
        {local.children}
      </Popover>
    </TreeSelectContext.Provider>
  )
}
