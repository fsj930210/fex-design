import type { TreeNodeData, TreeVisibleItem } from '@fex-design/core/tree/types'
import { treeViewportClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode } from 'react'
import { useTreeContext } from './tree-context'
import { useTreeVisibleItems } from './use-tree-visible-items'

export interface TreeViewportProps<TNode extends TreeNodeData> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  children: (item: TreeVisibleItem<TNode>) => ReactNode
}

export function TreeViewport<TNode extends TreeNodeData>({
  children,
  className,
  ...props
}: TreeViewportProps<TNode>) {
  const { tree } = useTreeContext<TNode>()
  const items = useTreeVisibleItems(tree)
  return (
    <div {...props} data-slot="tree-viewport" className={cn(treeViewportClassName, className)}>
      {items.map((item) => children(item))}
    </div>
  )
}
