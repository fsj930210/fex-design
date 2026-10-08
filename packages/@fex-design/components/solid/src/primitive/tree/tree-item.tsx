import type { ExpansionFeatureApi } from '@fex-design/core/tree/features/expansion'
import type { SelectionFeatureApi } from '@fex-design/core/tree/features/selection'
import type { CheckFeatureApi } from '@fex-design/core/tree/features/check'
import type { FocusFeatureApi } from '@fex-design/core/tree/features/focus'
import type {
  TreeItem as CoreTreeItem,
  TreeKey,
  TreeNodeData,
} from '@fex-design/core/tree/types'
import { treeItemClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import {
  createMemo,
  Show,
  splitProps,
  type JSX,
} from 'solid-js'
import { createTreeItem } from './create-tree-item'
import { useTreeContext } from './tree-context'

export interface TreeItemState<TNode extends TreeNodeData> {
  item: CoreTreeItem<TNode>
  itemProps: JSX.HTMLAttributes<HTMLDivElement>
  expanded: boolean
  selected: boolean
  checked: boolean
  checkedState: boolean | 'indeterminate'
  focused: boolean
  loadState: 'unloaded' | 'loading' | 'loaded' | 'error'
  loadError: unknown
  actions: {
    expand(): void
    collapse(): void
    toggleExpanded(): void
    toggleSelected(): void
    toggleChecked(): void
  }
}

export interface TreeItemProps<TNode extends TreeNodeData> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children' | 'style'
> {
  itemKey: TreeKey
  block?: boolean
  style?: JSX.CSSProperties
  children: JSX.Element | ((state: TreeItemState<TNode>) => JSX.Element)
}

export function TreeItem<TNode extends TreeNodeData>(props: TreeItemProps<TNode>) {
  const [local, attrs] = splitProps(props, [
    'itemKey',
    'block',
    'children',
    'class',
    'style',
    'onClick',
    'onFocus',
  ])
  const { tree, indent, rowHeight } = useTreeContext<TNode>('TreeItem')
  const state = createTreeItem(tree, local.itemKey)
  const actions = {
    expand: () => tree.getFeature<ExpansionFeatureApi>('expansion')?.expand(local.itemKey),
    collapse: () => tree.getFeature<ExpansionFeatureApi>('expansion')?.collapse(local.itemKey),
    toggleExpanded: () => tree.getFeature<ExpansionFeatureApi>('expansion')?.toggle(local.itemKey),
    toggleSelected: () => tree.getFeature<SelectionFeatureApi>('selection')?.toggle(local.itemKey),
    toggleChecked: () =>
      tree.getFeature<CheckFeatureApi>('check')?.check(local.itemKey, !state().checked),
  }
  const renderState = createMemo<TreeItemState<TNode> | undefined>(() => {
    const item = state().item
    if (!item) return undefined
    const itemProps: JSX.HTMLAttributes<HTMLDivElement> &
      Record<`data-${string}`, string | boolean | undefined> = {
      ...attrs,
      role: 'treeitem',
      tabIndex: state().focused ? 0 : -1,
      'aria-level': item.depth + 1,
      'aria-expanded': item.isLeaf ? undefined : state().expanded,
      'aria-selected': state().selected || undefined,
      'aria-checked':
        state().checkedState === 'indeterminate' ? 'mixed' : state().checked || undefined,
      'aria-disabled': item.disabled || undefined,
      'aria-posinset': item.index + 1,
      'data-key': String(item.key),
      'data-selected': state().selected || undefined,
      'data-selectable': tree.hasFeature('selection') || undefined,
      'data-expanded': state().expanded || undefined,
      'data-checked': state().checked || undefined,
      'data-disabled': item.disabled || undefined,
      'data-leaf': item.isLeaf || undefined,
      'data-block': local.block || undefined,
      class: cn(treeItemClassName(), local.class),
      style: {
        ...local.style,
        height: `${rowHeight()}px`,
        'margin-inline-start': `${item.depth * indent()}px`,
        'padding-inline-start': '4px',
        '--tree-item-inline-start': '4px',
      },
      onFocus: (event) => {
        if (typeof local.onFocus === 'function') local.onFocus(event)
        tree.getFeature<FocusFeatureApi>('focus')?.focus(item.key)
      },
      onClick: (event) => {
        if (typeof local.onClick === 'function') local.onClick(event)
        if (!event.defaultPrevented && !item.disabled) actions.toggleSelected()
      },
    }
    return { ...state(), item, itemProps, actions }
  })

  return (
    <Show when={renderState()} keyed>
      {(current) =>
        typeof local.children === 'function' ? (
          local.children(current)
        ) : (
          <div {...current.itemProps}>{local.children}</div>
        )
      }
    </Show>
  )
}
