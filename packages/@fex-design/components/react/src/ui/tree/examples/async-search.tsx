import { Tree } from '@fex-design/react/ui/tree'
import { Select } from '@fex-design/react/ui/select'
import { useAsyncSearchDemo } from '../../../primitive/tree/examples/async-search-model'

export default function AsyncSearchExample() {
  const model = useAsyncSearchDemo()

  return (
    <div className="grid gap-space-sm">
      <Select
        className="w-72 max-w-full"
        options={model.options}
        value={model.selected ?? []}
        searchable
        clearable
        filterOption={() => true}
        loading={model.loading}
        onSearch={(keyword) => void model.search(keyword)}
        onChange={(value) => void model.choose(value)}
        placeholder="搜索部门或节点"
        emptyContent="没有匹配节点"
        contentProps={{ loadingContent: '搜索中…' }}
      />
      <p className="text-xs text-muted-foreground">
        可搜索：Department 2、Group 2.3、Item 2.3.3；清除选择恢复原树。
      </p>
      <div hidden={Boolean(model.selected)}>
        <Tree treeData={model.treeData} loadChildren={model.loadChildren} />
      </div>
      {model.locating ? <p role="status">正在加载祖先路径…</p> : null}
      {model.path ? (
        <Tree
          key={model.selected}
          treeData={model.path.treeData}
          defaultExpandedKeys={model.path.expandedKeys}
        />
      ) : null}
    </div>
  )
}
