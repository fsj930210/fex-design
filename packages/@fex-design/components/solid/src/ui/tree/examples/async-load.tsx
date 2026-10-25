import type { TreeDataNode } from '@fex-design/solid/ui/tree'
import { createSignal, createMemo } from 'solid-js'
import { Tree } from '@fex-design/solid/ui/tree'

import { asyncTreeDemoData, createTreeDemoChildren } from './_data/tree-async-demo'
import { updateRemoteChildren } from './_data/tree-remote-demo'
export default function Example() {
  const [treeData, setTreeData] =
    createSignal<readonly TreeDataNode<string, string>[]>(asyncTreeDemoData)

  const treeProps = createMemo(() => ({
    treeData: treeData(),
    loadChildren: async (item: { key: string | number }) => {
      const children = await new Promise<readonly TreeDataNode<string, string>[]>((resolve) =>
        setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
      )
      setTreeData((current) => updateRemoteChildren(current, String(item.key), children))
      return children
    },
  }))
  return (
    <div class="grid w-full gap-space-sm">
      <p class="text-sm text-muted-foreground">
        展开 Lazy department，加载期间显示 Spinner，完成后显示子节点。
      </p>
      <Tree {...treeProps()} />
    </div>
  )
}
