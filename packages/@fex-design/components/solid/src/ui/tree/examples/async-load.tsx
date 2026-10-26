import { createSignal, createMemo } from 'solid-js'
import { Tree } from '@fex-design/solid/ui/tree'

import { asyncTreeDemoData, createTreeDemoChildren } from './_data/tree-async-demo'
import { updateRemoteChildren } from './_data/tree-remote-demo'
export default function Example() {
  const [treeData, setTreeData] =
    createSignal<readonly Record<string, unknown>[]>(asyncTreeDemoData)

  const treeProps = createMemo(() => ({
    treeData: treeData(),
    loadChildren: async (item: { key: string | number }) => {
      const children = await new Promise<readonly Record<string, unknown>[]>((resolve) =>
        setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
      )
      setTreeData((current) => updateRemoteChildren(current, String(item.key), children))
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
