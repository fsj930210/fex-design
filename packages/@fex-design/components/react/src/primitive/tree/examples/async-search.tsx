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
  type TreeOptions,
} from '@fex-design/react/primitive/tree'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/react/primitive/select'
import { Spinner } from '@fex-design/react/primitive/spinner'
import { useAsyncSearchDemo } from './async-search-model'

function DemoTree({ options }: { options: TreeOptions<TreeDataNode<string, string>> }) {
  return (
    <TreeRoot options={options}>
      <TreeViewport>
        {(item) => (
          <TreeItem key={item.key} itemKey={item.key}>
            {(state) => (
              <div {...state.itemProps}>
                {state.loadState === 'loading' ? (
                  <Spinner size="sm" aria-label="加载子节点" />
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
  )
}

export default function AsyncSearchExample() {
  const model = useAsyncSearchDemo()
  const [features] = useState(() => [
    expansionFeature<TreeDataNode<string, string>>(),
    asyncLoadFeature<TreeDataNode<string, string>>({ loadChildren: model.loadChildren }),
  ])
  return (
    <div className="grid gap-space-sm">
      <SelectRoot
        options={model.options}
        value={model.selected ?? []}
        showSearch
        clearable
        filterOption={() => true}
        loading={model.loading}
        onSearch={(keyword) => void model.search(keyword)}
        onChange={(value) => void model.choose(value)}
      >
        <SelectTrigger className="w-72 max-w-full" placeholder="搜索部门或节点" />
        <SelectContent loadingContent="搜索中…" emptyContent="没有匹配节点" />
      </SelectRoot>
      <p className="text-xs text-muted-foreground">
        可搜索：Department 2、Group 2.3、Item 2.3.3；清除选择恢复原树。
      </p>
      <div hidden={Boolean(model.selected)}>
        <DemoTree options={{ treeData: model.treeData, features }} />
      </div>
      {model.locating ? <p role="status">正在加载祖先路径…</p> : null}
      {model.path ? (
        <DemoTree
          key={model.selected}
          options={{
            treeData: model.path.treeData,
            defaultExpandedKeys: model.path.expandedKeys,
            features: [expansionFeature<TreeDataNode<string, string>>()],
          }}
        />
      ) : null}
    </div>
  )
}
