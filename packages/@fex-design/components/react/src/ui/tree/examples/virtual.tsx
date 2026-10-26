import type { TreeInstance } from '@fex-design/react/ui/tree'
import { useRef, useState } from 'react'
import { Tree } from '@fex-design/react/ui/tree'
import { Button } from '@fex-design/react/ui/button'
import {
  virtualTreeDemoData,
  virtualTreeExpandedKeys,
  virtualTreeTargetKey,
  virtualTreeNodeCount,
} from './_data/tree-virtual-demo'
export default function Example() {
  const [treeProps] = useState(() => ({
    treeData: virtualTreeDemoData,
    defaultExpandedKeys: virtualTreeExpandedKeys,
  }))
  const viewport = useRef<TreeInstance<Record<string, unknown>>>(null)
  return (
    <section className="grid w-full gap-space-sm">
      <p className="text-sm text-muted-foreground">
        共 {virtualTreeNodeCount} 个节点，240px 高度，仅渲染可视区域附近的行。
      </p>
      <Button onClick={() => viewport.current?.scrollTo(virtualTreeTargetKey, { reveal: true })}>
        定位 Item 80.4.8
      </Button>
      <Tree ref={viewport} {...treeProps} virtual virtualHeight={240} />
    </section>
  )
}
