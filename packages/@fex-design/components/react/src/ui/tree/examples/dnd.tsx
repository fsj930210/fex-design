import { useState } from 'react'

import { Tree } from '@fex-design/react/ui/tree'
import { treeDndDemoData } from './_data/tree-demo'
export default function TreeDndExample() {
  const [message, setMessage] = useState(
    'Item 1.1.2 不可拖动；Item 1.1.3 不可放置。其他节点可拖放。',
  )
  const [treeProps] = useState(() => ({
    treeData: treeDndDemoData,
    defaultExpandedKeys: ['root-1', 'root-1-group-1'],
  }))
  return (
    <div className="w-[min(36rem,100%)] min-w-0">
      <p className="mb-space-sm min-h-10 break-all text-sm text-muted-foreground">{message}</p>
      <Tree
        className="w-full max-w-xl overflow-x-hidden"
        {...treeProps}
        draggable
        onDrop={({ sourceItem, targetItem, intent }) => {
          if (!intent?.valid) return
          setMessage(
            `${String(sourceItem?.data.title)} → ${String(targetItem?.data.title)}（${intent.position === 'inside' ? '成为子节点' : '排在其后'}）`,
          )
        }}
      />
    </div>
  )
}
