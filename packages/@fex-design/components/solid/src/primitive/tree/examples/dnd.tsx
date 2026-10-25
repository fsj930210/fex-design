import type { TreeDataNode } from '@fex-design/solid/primitive/tree'
import { createSignal } from 'solid-js'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  dndFeature,
  expansionFeature,
  type TreeDragEventContext,
} from '@fex-design/solid/primitive/tree'
import { treeDndDemoData } from './_data/tree-demo'
export default function Example() {
  const options = {
    treeData: treeDndDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      dndFeature<TreeDataNode<string, string>>(),
    ],
  }
  const [message, setMessage] = createSignal(
    'Item 1.1.2 不可拖动；Item 1.1.3 不可放置。其他节点可拖放。',
  )
  const callbacks = {
    onDrop: ({
      sourceItem,
      targetItem,
      intent,
    }: TreeDragEventContext<TreeDataNode<string, string>>) => {
      if (!intent?.valid) return
      setMessage(
        `${String(sourceItem?.data.title)} → ${String(targetItem?.data.title)}（${intent.position === 'inside' ? '成为子节点' : '排在其后'}）`,
      )
    },
  }
  return (
    <div class="w-[min(36rem,100%)] min-w-0">
      <p class="mb-space-sm min-h-10 break-all text-sm text-muted-foreground">{message()}</p>
      <TreeRoot options={options}>
        <TreeViewport>
          {(item) => (
            <TreeItem itemKey={item.key} draggable dndCallbacks={callbacks}>
              {(state) => (
                <div {...state.itemProps}>
                  <TreeTrigger itemKey={item.key} />
                  <TreeTitle>{String(item.data.title)}</TreeTitle>
                </div>
              )}
            </TreeItem>
          )}
        </TreeViewport>
      </TreeRoot>
    </div>
  )
}
