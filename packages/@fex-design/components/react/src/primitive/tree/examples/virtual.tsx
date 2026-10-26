import { useRef, useState } from 'react'
import {
  TreeRoot,
  TreeVirtualViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  focusFeature,
} from '@fex-design/react/primitive/tree'
import { Button } from '@fex-design/react/primitive/button'
import {
  virtualTreeDemoData,
  virtualTreeExpandedKeys,
  virtualTreeTargetKey,
  virtualTreeNodeCount,
} from './_data/tree-virtual-demo'
export default function Example() {
  const [options] = useState(() => ({
    treeData: virtualTreeDemoData,
    defaultExpandedKeys: virtualTreeExpandedKeys,
    features: [
      expansionFeature<Record<string, unknown>>(),
      focusFeature<Record<string, unknown>>(),
    ],
  }))
  const viewport = useRef<{ scrollTo(key: string, options?: { reveal?: boolean }): boolean }>(null)
  return (
    <section className="grid w-full gap-space-sm">
      <p className="text-sm text-muted-foreground">
        共 {virtualTreeNodeCount} 个节点，240px 高度，仅渲染可视区域附近的行。
      </p>
      <Button onClick={() => viewport.current?.scrollTo(virtualTreeTargetKey, { reveal: true })}>
        定位 Item 80.4.8
      </Button>
      <TreeRoot options={options}>
        <TreeVirtualViewport ref={viewport} height={240}>
          {(item) => (
            <TreeItem key={item.key} itemKey={item.key}>
              {(state) => (
                <div {...state.itemProps}>
                  <TreeTrigger itemKey={item.key} />
                  <TreeTitle>{String(item.data.title)}</TreeTitle>
                </div>
              )}
            </TreeItem>
          )}
        </TreeVirtualViewport>
      </TreeRoot>
    </section>
  )
}
