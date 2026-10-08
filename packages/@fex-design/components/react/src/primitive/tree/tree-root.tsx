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
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from 'react'
import { TreeContext, type TreeContextValue } from './tree-context'
import { useTreeController } from './use-tree'

export interface TreeRootProps<TNode extends TreeNodeData> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  controller?: TreeController<TNode> | undefined
  options?: TreeOptions<TNode> | undefined
  indent?: number | undefined
  rowHeight?: number | undefined
  ref?: Ref<HTMLDivElement> | undefined
  children: ReactNode | ((tree: TreeController<TNode>) => ReactNode)
}

function TreeRootWithController<TNode extends TreeNodeData>({
  controller,
  indent = 16,
  rowHeight = 32,
  className,
  style,
  ref,
  children,
  onKeyDown,
  ...props
}: Omit<TreeRootProps<TNode>, 'options'> & { controller: TreeController<TNode> }) {
  const selection = controller.getFeature<SelectionFeatureApi>('selection')
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      !controller.hasFeature('keyboard')
    )
      return
    const target = event.target
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return
    const visibleItems = controller.getVisibleItems()
    const expansion = controller.getFeature<ExpansionFeatureApi>('expansion')
    const check = controller.getFeature<CheckFeatureApi>('check')
    const focus = controller.getFeature<FocusFeatureApi>('focus')
    const focusedIndex = visibleItems.findIndex(
      (item) => item.key === controller.getSnapshot().focusedKey,
    )
    const focusedItem = focusedIndex >= 0 ? visibleItems[focusedIndex] : undefined
    const focusAt = (index: number) => focus?.focus(visibleItems[index]?.key ?? null)

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusAt(Math.min(focusedIndex + 1, visibleItems.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusAt(Math.max(focusedIndex - 1, 0))
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusAt(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusAt(visibleItems.length - 1)
    } else if (event.key === 'ArrowRight' && focusedItem) {
      event.preventDefault()
      if (!focusedItem.isLeaf && !controller.getSnapshot().expandedKeys.includes(focusedItem.key)) {
        expansion?.expand(focusedItem.key)
      } else {
        focus?.focus(controller.getVisibleItemAt(focusedIndex + 1)?.key ?? focusedItem.key)
      }
    } else if (event.key === 'ArrowLeft' && focusedItem) {
      event.preventDefault()
      if (controller.getSnapshot().expandedKeys.includes(focusedItem.key)) {
        expansion?.collapse(focusedItem.key)
      } else {
        focus?.focus(focusedItem.parentKey)
      }
    } else if (event.key === 'Enter' && focusedItem) {
      selection?.toggle(focusedItem.key)
    } else if (event.key === ' ' && focusedItem) {
      event.preventDefault()
      check?.check(focusedItem.key, !controller.getSnapshot().checkedKeys.includes(focusedItem.key))
    }
  }

  return (
    <TreeContext value={{ tree: controller, indent, rowHeight } as TreeContextValue}>
      <div
        {...props}
        ref={ref}
        data-slot="tree"
        role="tree"
        tabIndex={0}
        aria-multiselectable={selection?.isMultiple() || undefined}
        className={cn(treeRootClassName, className)}
        style={{ ...style, '--tree-indent': `${indent}px` } as CSSProperties}
        onKeyDown={handleKeyDown}
      >
        {typeof children === 'function' ? children(controller) : children}
      </div>
    </TreeContext>
  )
}

export function TreeRoot<TNode extends TreeNodeData>(props: TreeRootProps<TNode>) {
  const controller = useTreeController(
    props.options ?? (props.controller ? undefined : ({ treeData: [] } as TreeOptions<TNode>)),
    props.controller,
  )
  const { options: _options, controller: _controller, ...rootProps } = props
  return <TreeRootWithController {...rootProps} controller={controller} />
}
