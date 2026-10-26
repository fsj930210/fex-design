import { For, Show } from 'solid-js'
import {
  createTree,
  createTreeVisibleItems,
  expansionFeature,
  selectionFeature,
} from '@fex-design/solid/primitive/tree'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { treeDemoData } from './_data/tree-demo'
export default function Example() {
  const options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<Record<string, unknown>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      selectionFeature<Record<string, unknown>>(),
    ],
  }
  const tree = createTree(() => options)
  const items = createTreeVisibleItems(tree)
  const snapshot = createCoreStoreSignal({
    getSnapshot: tree.getSnapshot,
    subscribe: tree.subscribe,
  })
  const expansion = tree.getFeature<{ toggle(key: string | number): void }>('expansion')
  const selection = tree.getFeature<{ toggle(key: string | number): void }>('selection')
  return (
    <section class="grid w-full gap-space-sm">
      <p class="text-sm text-muted-foreground">纯 DOM 树：点击箭头展开，点击名称选择。</p>
      <div role="tree" aria-label="自定义 DOM 树" class="max-h-64 overflow-y-auto">
        <For each={items()}>
          {(item) => (
            <div
              role="treeitem"
              aria-level={item.depth + 1}
              aria-expanded={item.isLeaf ? undefined : snapshot().expandedKeys.includes(item.key)}
              aria-selected={snapshot().selectedKeys.includes(item.key)}
              class="flex min-h-8 items-center gap-2"
              style={{ 'padding-inline-start': item.depth * 20 + 'px' }}
            >
              <Show when={!item.isLeaf} fallback={<span class="size-6 shrink-0" />}>
                <button
                  type="button"
                  class="size-6 shrink-0 rounded hover:bg-muted"
                  aria-label={'展开或收起 ' + item.data.title}
                  onClick={() => expansion?.toggle(item.key)}
                >
                  {snapshot().expandedKeys.includes(item.key) ? '−' : '+'}
                </button>
              </Show>
              <button
                type="button"
                class="rounded px-2 py-1 hover:bg-muted"
                style={
                  snapshot().selectedKeys.includes(item.key)
                    ? { background: '#ede9fe', color: '#6d28d9' }
                    : undefined
                }
                onClick={() => selection?.toggle(item.key)}
              >
                {String(item.data.title)}
              </button>
            </div>
          )}
        </For>
      </div>
      <output class="text-sm" aria-live="polite">
        已选：
        {snapshot()
          .selectedKeys.map((key) => String(tree.getItem(key)?.data.title ?? key))
          .join('、') || '无'}
      </output>
    </section>
  )
}
