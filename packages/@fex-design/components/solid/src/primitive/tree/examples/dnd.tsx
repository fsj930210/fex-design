import { createSignal } from 'solid-js'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  dndFeature,
  expansionFeature,
  type TreeItemProps,
} from '@fex-design/solid/primitive/tree'
import { treeDndDemoData } from './_data/tree-demo'
import { createTreeDemoService } from './_data/tree-edit-demo'
export default function TreeDndExample() {
  const service = createTreeDemoService(treeDndDemoData)
  const [treeData, setTreeData] = createSignal<readonly Record<string, unknown>[]>(treeDndDemoData)
  const [expandedKeys, setExpandedKeys] = createSignal<readonly (string | number)[]>([
    'root-1',
    'root-1-group-1',
  ])
  const [busy, setBusy] = createSignal(false)
  const [message, setMessage] = createSignal(
    'Item 1.1.2 不可拖动；Item 1.1.3 不可放置。放置后调用接口并重新获取树。',
  )
  const features = [
    expansionFeature<Record<string, unknown>>(),
    dndFeature<Record<string, unknown>>(),
  ]
  const handleDrop: NonNullable<
    NonNullable<TreeItemProps<Record<string, unknown>>['dndCallbacks']>['onDrop']
  > = async ({ sourceItem, targetItem, intent }) => {
    if (!intent?.valid || busy()) return
    setBusy(true)
    setMessage('正在提交移动并重新获取树…')
    try {
      await service.move({
        sourceKey: intent.sourceKey,
        parentKey: intent.parentKey,
        index: intent.index,
      })
      setTreeData(await service.fetchTree())
      if (intent.position === 'inside')
        setExpandedKeys((keys) =>
          keys.includes(intent.targetKey) ? keys : [...keys, intent.targetKey],
        )
      setMessage(
        String(sourceItem?.title) + ' → ' + String(targetItem?.title) + '；已更新外部 treeData',
      )
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '移动失败，保留原数据')
    } finally {
      setBusy(false)
    }
  }
  return (
    <div class="w-[min(36rem,100%)] min-w-0">
      <p class="mb-space-sm min-h-10 break-all text-sm text-muted-foreground" aria-live="polite">
        {message()}
      </p>
      <TreeRoot
        options={{
          treeData: treeData(),
          expandedKeys: expandedKeys(),
          onExpandedKeysChange: setExpandedKeys,
          features,
          disabled: busy(),
        }}
      >
        <TreeViewport>
          {(item) => (
            <TreeItem itemKey={item.key} draggable dndCallbacks={{ onDrop: handleDrop }}>
              {(state) => (
                <div {...state.itemProps}>
                  <TreeTrigger itemKey={item.key} />
                  <TreeTitle>{String(item.title)}</TreeTitle>
                </div>
              )}
            </TreeItem>
          )}
        </TreeViewport>
      </TreeRoot>
    </div>
  )
}
