import type { ExpansionFeatureApi } from '@fex-design/core/tree/features/expansion'
import type { SelectionFeatureApi } from '@fex-design/core/tree/features/selection'
import type { CheckFeatureApi } from '@fex-design/core/tree/features/check'
import type { FocusFeatureApi } from '@fex-design/core/tree/features/focus'
import type {
  TreeController,
  TreeNodeData,
  TreeOptions,
} from '@fex-design/core/tree/types'
import { treeRootClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  type Accessor,
  type JSX,
} from 'solid-js'
import { createTreeAdapter } from './create-tree'
import { TreeContext, type TreeContextValue } from './tree-context'

export interface TreeRootProps<TNode extends TreeNodeData> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children' | 'style'
> {
  controller?: TreeController<TNode>
  options?: TreeOptions<TNode> | Accessor<TreeOptions<TNode>>
  indent?: number
  rowHeight?: number
  style?: JSX.CSSProperties
  children: JSX.Element | ((tree: TreeController<TNode>) => JSX.Element)
}

export function TreeRoot<TNode extends TreeNodeData>(props: TreeRootProps<TNode>) {
  const getOptions = () => (typeof props.options === 'function' ? props.options() : props.options)
  const tree = createTreeAdapter(
    () => getOptions() ?? (props.controller ? undefined : { treeData: [] }),
    props.controller,
  )
  const [local, rootProps] = splitProps(props, [
    'controller',
    'options',
    'indent',
    'rowHeight',
    'class',
    'style',
    'children',
    'onKeyDown',
  ])
  const selection = () => tree.getFeature<SelectionFeatureApi>('selection')
  const indent = () => local.indent ?? 16
  const rowHeight = () => local.rowHeight ?? 32

  const handleKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    if (typeof local.onKeyDown === 'function') local.onKeyDown(event)
    if (event.defaultPrevented || event.isComposing || !tree.hasFeature('keyboard')) return
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return
    }

    const items = tree.getVisibleItems()
    const expansion = tree.getFeature<ExpansionFeatureApi>('expansion')
    const check = tree.getFeature<CheckFeatureApi>('check')
    const focus = tree.getFeature<FocusFeatureApi>('focus')
    const index = items.findIndex((item) => item.key === tree.getSnapshot().focusedKey)
    const item = index >= 0 ? items[index] : undefined
    const focusAt = (next: number) => focus?.focus(items[next]?.key ?? null)

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusAt(Math.min(index + 1, items.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusAt(Math.max(index - 1, 0))
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusAt(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusAt(items.length - 1)
    } else if (event.key === 'ArrowRight' && item) {
      event.preventDefault()
      if (!item.isLeaf && !tree.getSnapshot().expandedKeys.includes(item.key)) {
        expansion?.expand(item.key)
      } else {
        focus?.focus(tree.getVisibleItemAt(index + 1)?.key ?? item.key)
      }
    } else if (event.key === 'ArrowLeft' && item) {
      event.preventDefault()
      if (tree.getSnapshot().expandedKeys.includes(item.key)) {
        expansion?.collapse(item.key)
      } else {
        focus?.focus(item.parentKey)
      }
    } else if (event.key === 'Enter' && item) {
      selection()?.toggle(item.key)
    } else if (event.key === ' ' && item) {
      event.preventDefault()
      check?.check(item.key, !tree.getSnapshot().checkedKeys.includes(item.key))
    }
  }

  return (
    <TreeContext.Provider value={{ tree, indent, rowHeight } as TreeContextValue<TreeNodeData>}>
      <div
        {...rootProps}
        role="tree"
        data-slot="tree"
        tabIndex={0}
        aria-multiselectable={selection()?.isMultiple() || undefined}
        class={cn(treeRootClassName, local.class)}
        style={{ ...local.style, '--tree-indent': `${indent()}px` }}
        onKeyDown={handleKeyDown}
      >
        {typeof local.children === 'function' ? local.children(tree) : local.children}
      </div>
    </TreeContext.Provider>
  )
}
