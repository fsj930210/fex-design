import { handleTreeKeyboard, focusTreeEntry } from '@fex-design/core/tree/keyboard-dom'
import type { SelectionFeatureApi } from '@fex-design/core/tree/features/selection'
import type { TreeController, TreeNodeData, TreeOptions } from '@fex-design/core/tree/types'
import { treeRootClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { splitProps, type Accessor, type JSX } from 'solid-js'
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
    'onFocus',
  ])
  const selection = () => tree.getFeature<SelectionFeatureApi>('selection')
  const indent = () => local.indent ?? 16
  const rowHeight = () => local.rowHeight ?? 32

  const handleKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (event) => {
    if (typeof local.onKeyDown === 'function') local.onKeyDown(event)
    handleTreeKeyboard(tree, event.currentTarget, event)
  }

  return (
    <TreeContext.Provider value={{ tree, indent, rowHeight } as TreeContextValue<TreeNodeData>}>
      <div
        {...rootProps}
        {...(getOptions()?.disabled ? { 'aria-disabled': true } : {})}
        role="tree"
        data-slot="tree"
        tabIndex={0}
        aria-multiselectable={selection()?.isMultiple() || undefined}
        class={cn(treeRootClassName, local.class)}
        style={local.style}
        onKeyDown={handleKeyDown}
        onFocus={(event) => {
          if (typeof local.onFocus === 'function') local.onFocus(event)
          if (!event.defaultPrevented)
            focusTreeEntry(tree, event.currentTarget, event.target, event.relatedTarget)
        }}
      >
        {typeof local.children === 'function' ? local.children(tree) : local.children}
      </div>
    </TreeContext.Provider>
  )
}
