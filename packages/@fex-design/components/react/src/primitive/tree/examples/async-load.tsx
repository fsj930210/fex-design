import type { TreeDataNode } from '@fex-design/react/primitive/tree'
import { useState } from 'react'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  asyncLoadFeature,
} from '@fex-design/react/primitive/tree'
import { Spinner } from '@fex-design/react/primitive/spinner'
import { asyncTreeDemoData, createTreeDemoChildren } from './_data/tree-async-demo'
import { updateRemoteChildren } from './_data/tree-remote-demo'
export default function Example() {
  const [treeData, setTreeData] =
    useState<readonly TreeDataNode<string, string>[]>(asyncTreeDemoData)
  const [features] = useState(() => [
    expansionFeature<TreeDataNode<string, string>>(),
    asyncLoadFeature<TreeDataNode<string, string>>({
      loadChildren: async (item) => {
        const children = await new Promise<readonly TreeDataNode<string, string>[]>((resolve) =>
          setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
        )
        setTreeData((current) => updateRemoteChildren(current, String(item.key), children))
        return children
      },
    }),
  ])
  return (
    <div className="grid w-full gap-space-sm">
      <p className="text-sm text-muted-foreground">
        展开 Lazy department，加载期间显示 Spinner，完成后显示子节点。
      </p>
      <TreeRoot options={{ treeData, features }}>
        <TreeViewport>
          {(item) => (
            <TreeItem key={item.key} itemKey={item.key}>
              {(state) => (
                <div {...state.itemProps}>
                  {state.loadState === 'loading' ? (
                    <Spinner size="sm" aria-label="Loading children" />
                  ) : (
                    <TreeTrigger itemKey={item.key} />
                  )}
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
