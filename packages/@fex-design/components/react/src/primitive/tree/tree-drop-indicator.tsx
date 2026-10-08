import type { TreeDropIntent } from '@fex-design/core/tree/features/dnd'
import type { TreeItem as CoreTreeItem, TreeNodeData } from '@fex-design/core/tree/types'
import { treeDropIndicatorClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'
import { useTreeContext } from './tree-context'

export interface TreeDropIndicatorProps<TNode extends TreeNodeData> extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  item?: CoreTreeItem<TNode> | undefined
  intent?: TreeDropIntent | null | undefined
}

export function TreeDropIndicator<TNode extends TreeNodeData>({
  item,
  intent,
  className,
  style,
  ...props
}: TreeDropIndicatorProps<TNode>) {
  const { indent } = useTreeContext<TNode>()
  if (!intent?.valid || (item && intent.targetKey !== item.key)) return null
  return (
    <span
      {...props}
      data-slot="tree-drop-indicator"
      data-position={intent.position}
      className={cn(treeDropIndicatorClassName, className)}
      style={{
        left: intent.position === 'inside' ? indent : 4,
        bottom: 0,
        transform: 'translateY(1px)',
        ...style,
      }}
    />
  )
}
