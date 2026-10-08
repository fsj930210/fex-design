import type { TreeNodeData, TreeVisibleItem } from '@fex-design/core/tree/types'
import { treeViewportClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { For, splitProps, type JSX } from 'solid-js'
import { createTreeVisibleItems } from './create-tree-visible-items'
import { useTreeContext } from './tree-context'

export interface TreeViewportProps<TNode extends TreeNodeData> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  children: (item: TreeVisibleItem<TNode>) => JSX.Element
}

export function TreeViewport<TNode extends TreeNodeData>(props: TreeViewportProps<TNode>) {
  const [local, attrs] = splitProps(props, ['children', 'class'])
  const { tree } = useTreeContext<TNode>('TreeViewport')
  const items = createTreeVisibleItems(tree)

  return (
    <div {...attrs} data-slot="tree-viewport" class={cn(treeViewportClassName, local.class)}>
      <For each={items()}>{local.children}</For>
    </div>
  )
}
