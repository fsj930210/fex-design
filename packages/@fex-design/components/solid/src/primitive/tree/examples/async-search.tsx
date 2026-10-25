import type { TreeDataNode } from '@fex-design/solid/primitive/tree'
import { createSignal, createMemo, onMount, onCleanup, Show } from 'solid-js'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  asyncLoadFeature,
} from '@fex-design/solid/primitive/tree'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/solid/primitive/select'
import {
  loadRemoteTree,
  searchRemoteTree,
  loadRemoteAncestors,
  updateRemoteChildren,
  type TreeSearchMatch,
  type TreeAncestorResult,
} from './_data/tree-remote-demo'
export default function Example() {
  const [treeData, setTreeData] = createSignal<readonly TreeDataNode<string, string>[]>([])
  const [matches, setMatches] = createSignal<TreeSearchMatch[]>([])
  const [selected, setSelected] = createSignal<string>()
  const [path, setPath] = createSignal<TreeAncestorResult>()
  const [loading, setLoading] = createSignal(false),
    [locating, setLocating] = createSignal(false)
  let searchId = 0,
    pathId = 0,
    active = true
  onMount(() => {
    void loadRemoteTree().then((roots) => {
      if (active) setTreeData(roots)
    })
  })
  onCleanup(() => {
    active = false
    searchId++
    pathId++
  })
  const search = async (keyword: string) => {
    const request = ++searchId
    setLoading(true)
    const result = await searchRemoteTree(keyword)
    if (request !== searchId) return
    setMatches(result)
    setLoading(false)
  }
  const choose = async (value: unknown) => {
    const request = ++pathId
    searchId++
    setLoading(false)
    setPath(undefined)
    if (typeof value !== 'string') {
      setSelected(undefined)
      setMatches([])
      setLocating(false)
      return
    }
    setSelected(value)
    setLocating(true)
    const result = await loadRemoteAncestors(value)
    if (request !== pathId) return
    setPath(result)
    setLocating(false)
  }
  const loadChildren = async (item: { key: string | number }) => {
    const children = await loadRemoteTree(String(item.key))
    setTreeData((current) => updateRemoteChildren(current, String(item.key), children))
    return children
  }
  const features = [
    expansionFeature<TreeDataNode<string, string>>(),
    asyncLoadFeature<TreeDataNode<string, string>>({ loadChildren }),
  ]
  const rootOptions = createMemo(() => ({ treeData: treeData(), features }))
  return (
    <div class="grid gap-space-sm">
      <SelectRoot
        options={matches()}
        value={selected() ?? []}
        showSearch
        clearable
        filterOption={() => true}
        loading={loading()}
        onSearch={search}
        onChange={choose}
      >
        <SelectTrigger class="w-72 max-w-full" placeholder="搜索部门或节点" />
        <SelectContent loadingContent="搜索中…" emptyContent="没有匹配节点" />
      </SelectRoot>
      <p class="text-xs text-muted-foreground">
        可搜索：Department 2、Group 2.3、Item 2.3.3；清除选择恢复原树。
      </p>
      <div hidden={Boolean(selected())}>
        <TreeRoot options={rootOptions()}>
          <TreeViewport>
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
          </TreeViewport>
        </TreeRoot>
      </div>
      <Show when={locating()}>
        <p role="status">正在加载祖先路径…</p>
      </Show>
      <Show when={path()} keyed>
        {(result) => (
          <TreeRoot
            options={{
              treeData: result.treeData,
              defaultExpandedKeys: result.expandedKeys,
              features: [expansionFeature<TreeDataNode<string, string>>()],
            }}
          >
            <TreeViewport>
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
            </TreeViewport>
          </TreeRoot>
        )}
      </Show>
    </div>
  )
}
