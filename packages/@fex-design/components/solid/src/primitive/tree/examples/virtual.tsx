import {
  TreeRoot,
  TreeVirtualViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  focusFeature,
} from '@fex-design/solid/primitive/tree'
import { Button } from '@fex-design/solid/primitive/button'
import {
  virtualTreeDemoData,
  virtualTreeExpandedKeys,
  virtualTreeTargetKey,
  virtualTreeNodeCount,
} from './_data/tree-virtual-demo'
export default function Example() {
  const options = {
    treeData: virtualTreeDemoData,
    defaultExpandedKeys: virtualTreeExpandedKeys,
    features: [
      expansionFeature<Record<string, unknown>>(),
      focusFeature<Record<string, unknown>>(),
    ],
  }
  let viewport: { scrollTo(key: string, options?: { reveal?: boolean }): boolean } | undefined
  return (
    <section class="grid w-full gap-space-sm">
      <p class="text-sm text-muted-foreground">
        共 {virtualTreeNodeCount} 个节点，240px 高度，仅渲染可视区域附近的行。
      </p>
      <Button onClick={() => viewport?.scrollTo(virtualTreeTargetKey, { reveal: true })}>
        定位 Item 80.4.8
      </Button>
      <TreeRoot options={options}>
        <TreeVirtualViewport ref={(value) => (viewport = value)} height={240}>
          {(item) => (
            <TreeItem itemKey={item.key}>
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
