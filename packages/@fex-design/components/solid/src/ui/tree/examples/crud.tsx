import { createSignal } from 'solid-js'
import { Tree } from '@fex-design/solid/ui/tree'
import { Button } from '@fex-design/solid/ui/button'
import { CrudRow } from './crud-row'
import { treeCrudData } from './_data/tree-crud-demo'
import { createTreeDemoService } from './_data/tree-edit-demo'
export default function CrudExample() {
  const service = createTreeDemoService(treeCrudData)
  const [treeData, setTreeData] = createSignal<readonly Record<string, unknown>[]>(treeCrudData)
  const [expandedKeys, setExpandedKeys] = createSignal<readonly (string | number)[]>([
    'department-1',
    'group-1',
  ])
  const [busy, setBusy] = createSignal(false)
  const [message, setMessage] = createSignal('修改接口成功后重新获取树，外部 treeData 是唯一数据源')

  async function run(operation: () => Promise<void>, success: string, parentKey?: string | number) {
    if (busy()) return
    setBusy(true)
    setMessage('正在提交修改并重新获取树…')
    try {
      await operation()
      const nextData = await service.fetchTree()
      setTreeData(nextData)
      if (parentKey !== undefined)
        setExpandedKeys((current) =>
          current.includes(parentKey) ? current : [...current, parentKey],
        )
      setMessage(success)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '操作失败，保留原数据')
    } finally {
      setBusy(false)
    }
  }
  return (
    <section class="grid w-full gap-space-sm">
      <p class="text-sm text-muted-foreground">
        双击名称编辑；Enter 或失焦保存，Escape 取消；删除节点会删除其整个子树。
      </p>
      <div class="flex gap-2">
        <Button
          disabled={busy()}
          onClick={() => run(() => service.create(null), '已新增根节点，已重新获取 treeData')}
        >
          新增根节点
        </Button>
      </div>
      <div class="h-64 overflow-y-auto p-1">
        <Tree
          treeData={treeData()}
          expandedKeys={expandedKeys()}
          onExpand={setExpandedKeys}
          rowHeight={40}
          block
          renderItem={(item, api) => (
            <CrudRow
              title={String(item.title)}
              leaf={item.isLeaf}
              expanded={api.getSnapshot().expandedKeys.includes(item.key)}
              busy={busy()}
              onToggle={() =>
                api
                  .getFeature<{ toggle(key: string | number): void }>('expansion')
                  ?.toggle(item.key)
              }
              onSave={(title) =>
                run(() => service.rename(item.key, title), '已更新名称，已重新获取 treeData')
              }
              onAdd={() =>
                run(() => service.create(item.key), '已新增子节点，已重新获取 treeData', item.key)
              }
              onRemove={() =>
                run(() => service.remove(item.key), '已删除节点，已重新获取 treeData')
              }
            />
          )}
        />
      </div>
      <output class="text-xs text-muted-foreground" aria-live="polite">
        {message()}
      </output>
    </section>
  )
}
