import { useState } from 'react'
import { Tree } from '@fex-design/react/ui/tree'

import { asyncTreeDemoData, createTreeDemoChildren } from './_data/tree-async-demo'
import { updateRemoteChildren } from './_data/tree-remote-demo'
export default function Example() {
  const [treeData, setTreeData] = useState<readonly Record<string, unknown>[]>(asyncTreeDemoData)

  return (
    <div className="grid w-full gap-space-sm">
      <p className="text-sm text-muted-foreground">
        展开 Lazy department，加载期间显示 Spinner，完成后显示子节点。
      </p>
      <Tree
        treeData={treeData}
        loadChildren={async (item: { key: string | number }) => {
          const children = await new Promise<readonly Record<string, unknown>[]>((resolve) =>
            setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
          )
          setTreeData((current) => updateRemoteChildren(current, String(item.key), children))
        }}
      />
    </div>
  )
}
