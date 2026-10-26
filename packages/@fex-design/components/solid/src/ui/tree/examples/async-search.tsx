import { createSignal, createMemo, onMount, onCleanup, Show } from 'solid-js'
import { Tree } from '@fex-design/solid/ui/tree'
import { Select } from '@fex-design/solid/ui/select'
import {
  loadRemoteTree,
  searchRemoteTree,
  loadRemoteAncestors,
  updateRemoteChildren,
  type TreeSearchMatch,
  type TreeAncestorResult,
} from './_data/tree-remote-demo'
export default function Example() {
  const [treeData, setTreeData] = createSignal<readonly Record<string, unknown>[]>([])
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
  }

  const rootProps = createMemo(() => ({ treeData: treeData(), loadChildren: loadChildren }))
  return (
    <div class="grid gap-space-sm">
      <Select
        class="w-72 max-w-full"
        options={matches()}
        value={selected() ?? []}
        searchable
        clearable
        filterOption={() => true}
        loading={loading()}
        onSearch={search}
        onChange={choose}
        placeholder="搜索部门或节点"
        emptyContent="没有匹配节点"
        contentProps={{ loadingContent: '搜索中…' }}
      />
      <p class="text-xs text-muted-foreground">
        可搜索：Department 2、Group 2.3、Item 2.3.3；清除选择恢复原树。
      </p>
      <div hidden={Boolean(selected())}>
        <Tree {...rootProps()} />
      </div>
      <Show when={locating()}>
        <p role="status">正在加载祖先路径…</p>
      </Show>
      <Show when={path()} keyed>
        {(result) => <Tree treeData={result.treeData} defaultExpandedKeys={result.expandedKeys} />}
      </Show>
    </div>
  )
}
