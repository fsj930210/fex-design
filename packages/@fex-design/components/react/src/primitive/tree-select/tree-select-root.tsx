import { createTreeSelectController } from '@fex-design/core/tree-select/create-tree-select-controller'
import type {
  TreeSelectController,
  TreeSelectOptions,
} from '@fex-design/core/tree-select/types'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import {
  PopoverRoot,
  type PopoverRootProps,
} from '../popover'
import { TreeSelectContext } from './tree-select-context'

export interface TreeSelectRootProps<TNode = unknown>
  extends TreeSelectOptions<TNode>, Omit<PopoverRootProps, 'children'> {
  controller?: TreeSelectController<TNode> | undefined
  children?: ReactNode
  searchable?: boolean | undefined
  searchValue?: string | undefined
  defaultSearchValue?: string | undefined
  onSearchValueChange?: ((value: string) => void) | undefined
}

export function TreeSelectRoot<TNode = unknown>(props: TreeSelectRootProps<TNode>) {
  const optionsRef = useRef(props)
  optionsRef.current = props
  const controllerRef = useRef<TreeSelectController<TNode> | null>(null)
  controllerRef.current ??= createTreeSelectController({
    get value() {
      return optionsRef.current.value
    },
    get defaultValue() {
      return optionsRef.current.defaultValue
    },
    get multiple() {
      return optionsRef.current.multiple
    },
    get disabled() {
      return optionsRef.current.disabled
    },
    onChange: (value, meta) => optionsRef.current.onChange?.(value, meta),
  })
  const controller = props.controller ?? controllerRef.current
  const snapshot = useCoreStore(controller)
  useIsomorphicLayoutEffect(() => controller.updateOptions(props), [controller, props])
  const uncontrolledSearchRef = useRef(props.defaultSearchValue ?? '')
  const searchValue = props.searchValue ?? uncontrolledSearchRef.current
  const [uncontrolledOpen, setUncontrolledOpen] = useState(props.defaultOpen ?? false)
  const open = props.open ?? uncontrolledOpen
  const setOpen = (
    nextOpen: boolean,
    info: Parameters<NonNullable<PopoverRootProps['onOpenChange']>>[1] = { reason: 'manual' },
  ) => {
    if (props.open === undefined) setUncontrolledOpen(nextOpen)
    props.onOpenChange?.(nextOpen, info)
  }
  const setSearchValue = (value: string) => {
    if (props.searchValue === undefined) uncontrolledSearchRef.current = value
    props.onSearchValueChange?.(value)
  }
  const {
    children,
    controller: _controller,
    searchable: _searchable,
    searchValue: _searchValue,
    defaultSearchValue: _defaultSearchValue,
    onSearchValueChange: _onSearchValueChange,
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange: _onOpenChange,
    closeDelay,
    trigger,
    value: _value,
    defaultValue: _defaultValue,
    multiple: _multiple,
    onChange: _onChange,
    ...popoverProps
  } = props
  return (
    <TreeSelectContext
      value={{
        controller,
        snapshot,
        searchable: props.searchable === true,
        searchValue,
        setSearchValue,
        openPanel: () => setOpen(true),
        closePanel: () => setOpen(false),
      }}
    >
      <PopoverRoot
        {...popoverProps}
        trigger={trigger ?? []}
        closeDelay={closeDelay ?? 0}
        open={open}
        onOpenChange={setOpen}
        disabled={props.disabled}
      >
        {children}
      </PopoverRoot>
    </TreeSelectContext>
  )
}
