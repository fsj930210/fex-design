import type { TreeDataNode } from '@fex-design/react/primitive/tree'
import {
  dndFeature,
  expansionFeature,
  TreeItem,
  TreeDropIndicator,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
  useTreeDndItem,
} from '@fex-design/react/primitive/tree'
import { treeDndDemoData } from './_data/tree-demo'
import { useState } from 'react'
function Row({ tree, item, onDrop }: { tree: any; item: any; onDrop: (message: string) => void }) {
  const dnd = useTreeDndItem({
    tree,
    itemKey: item.key,
    callbacks: {
      onDrop: ({ sourceItem, targetItem, intent }) => {
        if (!intent?.valid) return
        onDrop(
          `${String(sourceItem?.data.title)} → ${String(targetItem?.data.title)}（${intent.position === 'inside' ? '成为子节点' : '排在其后'}）`,
        )
      },
    },
  })
  return (
    <TreeItem itemKey={item.key}>
      {(state) => (
        <div
          {...state.itemProps}
          {...dnd.itemProps}
          className={state.itemProps.className}
          style={{ ...state.itemProps.style, ...dnd.itemProps.style }}
        >
          <TreeTrigger itemKey={item.key} />
          <TreeTitle>{String(item.data.title)}</TreeTitle>
          <TreeDropIndicator item={state.item} intent={dnd.intent} style={dnd.dropIndicatorStyle} />
        </div>
      )}
    </TreeItem>
  )
}
export default function TreeDndPrimitiveExample() {
  const [message, setMessage] = useState(
    'Item 1.1.2 不可拖动；Item 1.1.3 不可放置。其他节点可拖放。',
  )
  const [options] = useState(() => ({
    treeData: treeDndDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      dndFeature<TreeDataNode<string, string>>(),
    ],
  }))
  return (
    <div className="w-[min(36rem,100%)] min-w-0">
      <p className="mb-space-sm min-h-10 break-all text-sm text-muted-foreground">{message}</p>
      <TreeRoot className="w-full max-w-xl overflow-x-hidden" options={options}>
        {(tree) => (
          <TreeViewport>
            {(item) => <Row key={item.key} tree={tree} item={item} onDrop={setMessage} />}
          </TreeViewport>
        )}
      </TreeRoot>
    </div>
  )
}
