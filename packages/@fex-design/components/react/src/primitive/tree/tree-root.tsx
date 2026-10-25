import { handleTreeKeyboard, focusTreeEntry } from '@fex-design/core/tree/keyboard-dom'
import type { SelectionFeatureApi } from '@fex-design/core/tree/features/selection'
import type { TreeController, TreeNodeData, TreeOptions } from '@fex-design/core/tree/types'
import { treeRootClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { type HTMLAttributes, type KeyboardEvent, type ReactNode, type Ref } from 'react'
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
  onFocus,
  ...props
}: Omit<TreeRootProps<TNode>, 'options'> & { controller: TreeController<TNode> }) {
  const selection = controller.getFeature<SelectionFeatureApi>('selection')
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (!event.nativeEvent.isComposing) handleTreeKeyboard(controller, event.currentTarget, event)
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
        style={style}
        onKeyDown={handleKeyDown}
        onFocus={(event) => {
          onFocus?.(event)
          if (!event.defaultPrevented)
            focusTreeEntry(controller, event.currentTarget, event.target, event.relatedTarget)
        }}
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
  return (
    <TreeRootWithController
      {...rootProps}
      aria-disabled={props.options?.disabled || rootProps['aria-disabled']}
      controller={controller}
    />
  )
}
