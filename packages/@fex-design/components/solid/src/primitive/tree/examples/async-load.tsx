import { createSignal, createMemo } from 'solid-js'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  asyncLoadFeature,
} from '@fex-design/solid/primitive/tree'
import { Spinner } from '@fex-design/solid/primitive/spinner'
import { asyncTreeDemoData, createTreeDemoChildren } from './_data/tree-async-demo'
import { updateRemoteChildren } from './_data/tree-remote-demo'
export default function Example() {
  const [treeData, setTreeData] =
    createSignal<readonly Record<string, unknown>[]>(asyncTreeDemoData)
  const features = [
    expansionFeature<Record<string, unknown>>(),
    asyncLoadFeature<Record<string, unknown>>({
      loadChildren: async (item) => {
        const children = await new Promise<readonly Record<string, unknown>[]>((resolve) =>
          setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
        )
        setTreeData((current) => updateRemoteChildren(current, String(item.key), children))
      },
    }),
  ]
  const options = createMemo(() => ({ treeData: treeData(), features }))
  return (
    <div class="grid w-full gap-space-sm">
      <p class="text-sm text-muted-foreground">
        展开 Lazy department，加载期间显示 Spinner，完成后显示子节点。
      </p>
      <TreeRoot options={options()}>
        <TreeViewport>
          {(item) => (
            <TreeItem itemKey={item.key}>
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
