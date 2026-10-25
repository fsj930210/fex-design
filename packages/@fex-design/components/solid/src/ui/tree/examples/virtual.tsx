import type { TreeDataNode } from '@fex-design/solid/ui/tree'
import type { TreeInstance } from '@fex-design/solid/ui/tree'
import { Tree } from '@fex-design/solid/ui/tree'
import { Button } from '@fex-design/solid/ui/button'
import {
  virtualTreeDemoData,
  virtualTreeExpandedKeys,
  virtualTreeTargetKey,
  virtualTreeNodeCount,
} from './_data/tree-virtual-demo'
export default function Example() {
  const treeProps = { treeData: virtualTreeDemoData, defaultExpandedKeys: virtualTreeExpandedKeys }
  let viewport: TreeInstance<TreeDataNode<string, string>> | undefined
  return (
    <section class="grid w-full gap-space-sm">
      <p class="text-sm text-muted-foreground">
        共 {virtualTreeNodeCount} 个节点，240px 高度，仅渲染可视区域附近的行。
      </p>
      <Button onClick={() => viewport?.scrollTo(virtualTreeTargetKey, { reveal: true })}>
        定位 Item 80.4.8
      </Button>
      <Tree ref={(value) => (viewport = value)} {...treeProps} virtual virtualHeight={240} />
    </section>
  )
}
