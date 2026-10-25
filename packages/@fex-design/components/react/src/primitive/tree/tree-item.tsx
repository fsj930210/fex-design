import type { ExpansionFeatureApi } from '@fex-design/core/tree/features/expansion'
import type { SelectionFeatureApi } from '@fex-design/core/tree/features/selection'
import type { CheckFeatureApi } from '@fex-design/core/tree/features/check'
import type { FocusFeatureApi } from '@fex-design/core/tree/features/focus'
import type {
  TreeDndCallbacks,
  TreeNode as CoreTreeNode,
  TreeKey,
  TreeNodeData,
} from '@fex-design/core/tree/types'
import { treeItemClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { useTreeContext } from './tree-context'
import { useTreeItem, type TreeItemState } from './use-tree-item'
import { useTreeDndItem } from './use-tree-dnd-item'

export type TreeItemDomProps = HTMLAttributes<HTMLDivElement> &
  Record<`data-${string}`, string | boolean | undefined>

export interface TreeItemRenderState<TNode extends TreeNodeData> extends TreeItemState<TNode> {
  item: CoreTreeNode<TNode>
  itemProps: TreeItemDomProps
  actions: {
    expand(): void
    collapse(): void
    toggleExpanded(): void
    toggleSelected(): void
    toggleChecked(): void
  }
  dnd: ReturnType<typeof useTreeDndItem>
}

export interface TreeItemProps<TNode extends TreeNodeData> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  itemKey: TreeKey
  block?: boolean | undefined
  draggable?: boolean | undefined
  dndCallbacks?: TreeDndCallbacks<TNode> | undefined
  children: ReactNode | ((state: TreeItemRenderState<TNode>) => ReactNode)
}

export function TreeItem<TNode extends TreeNodeData>({
  itemKey,
  block = false,
  draggable,
  dndCallbacks,
  children,
  className,
  style,
  onClick,
  ...props
}: TreeItemProps<TNode>) {
  const { tree, indent, rowHeight } = useTreeContext<TNode>()
  const state = useTreeItem(tree, itemKey)
  const dnd = useTreeDndItem({
    tree,
    itemKey,
    dragDisabled: draggable === false,
    callbacks: dndCallbacks,
  })
  if (!state.item) return null
  const item = state.item
  const itemProps: TreeItemDomProps = {
    ...props,
    role: 'treeitem',
    tabIndex: state.focused ? 0 : -1,
    'aria-level': item.depth + 1,
    'aria-expanded': item.isLeaf ? undefined : state.expanded,
    'aria-selected': state.selected || undefined,
    'aria-checked': state.checkedState === 'indeterminate' ? 'mixed' : state.checked || undefined,
    'aria-disabled': item.disabled || undefined,
    'aria-posinset': item.index + 1,
    'data-key': String(item.key),
    'data-selected': state.selected || undefined,
    'data-selectable': (item.selectable && tree.hasFeature('selection')) || undefined,
    'data-expanded': state.expanded || undefined,
    'data-checked': state.checked || undefined,
    'data-disabled': item.disabled || undefined,
    'data-leaf': item.isLeaf || undefined,
    'data-block': block || undefined,
    className: cn(treeItemClassName(), className),
    onFocus: () => tree.getFeature<FocusFeatureApi>('focus')?.focus(item.key),
    onClick: (event) => {
      onClick?.(event)
      if (!event.defaultPrevented && !item.disabled)
        tree.getFeature<SelectionFeatureApi>('selection')?.toggle(item.key)
    },
    ...dnd.itemProps,
    style: {
      ...dnd.itemProps.style,
      ...style,
      height: rowHeight,
      marginInlineStart: item.depth * indent,
      paddingInlineStart: 4,
    } as CSSProperties,
  }
  const renderState: TreeItemRenderState<TNode> = {
    ...state,
    item,
    itemProps,
    actions: {
      expand: () => tree.getFeature<ExpansionFeatureApi>('expansion')?.expand(item.key),
      collapse: () => tree.getFeature<ExpansionFeatureApi>('expansion')?.collapse(item.key),
      toggleExpanded: () => tree.getFeature<ExpansionFeatureApi>('expansion')?.toggle(item.key),
      toggleSelected: () => tree.getFeature<SelectionFeatureApi>('selection')?.toggle(item.key),
      toggleChecked: () =>
        tree.getFeature<CheckFeatureApi>('check')?.check(item.key, !state.checked),
    },
    dnd,
  }
  return typeof children === 'function' ? (
    children(renderState)
  ) : (
    <div {...itemProps}>{children}</div>
  )
}
