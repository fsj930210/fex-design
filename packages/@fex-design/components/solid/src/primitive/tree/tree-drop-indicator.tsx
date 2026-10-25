import type { TreeDropIntent } from '@fex-design/core/tree/features/dnd'
import type { TreeNode, TreeNodeData } from '@fex-design/core/tree/types'
import { treeDropIndicatorClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'
import { useTreeContext } from './tree-context'

export interface TreeDropIndicatorProps<
  TNode extends TreeNodeData,
> extends JSX.HTMLAttributes<HTMLSpanElement> {
  item?: TreeNode<TNode>
  intent?: TreeDropIntent | null
}
export function TreeDropIndicator<TNode extends TreeNodeData>(
  props: TreeDropIndicatorProps<TNode>,
) {
  const { indent } = useTreeContext<TNode>('TreeDropIndicator')
  return (
    <Show when={props.intent?.valid && (!props.item || props.intent.targetKey === props.item.key)}>
      <span
        {...props}
        data-slot="tree-drop-indicator"
        data-position={props.intent?.position}
        class={cn(treeDropIndicatorClassName, props.class)}
        style={{
          ...props.style,
          left: props.intent?.position === 'inside' ? `${indent()}px` : '4px',
          bottom: '0',
          transform: 'translateY(1px)',
        }}
      />
    </Show>
  )
}
