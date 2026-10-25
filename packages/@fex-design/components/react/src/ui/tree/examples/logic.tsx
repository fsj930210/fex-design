import type { TreeDataNode } from '@fex-design/react/ui/tree'
import { useSyncExternalStore } from 'react'
import {
  useTree,
  useTreeVisibleItems,
  expansionFeature,
  selectionFeature,
} from '@fex-design/react/ui/tree'
import { treeDemoData } from './_data/tree-demo'

export default function TreeLogicExample() {
  const tree = useTree({
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      selectionFeature<TreeDataNode<string, string>>(),
    ],
  })
  const items = useTreeVisibleItems(tree)
  // Subscribe to the external logic store so custom DOM reflects selection changes.
  const snapshot = useSyncExternalStore(tree.subscribe, tree.getSnapshot, tree.getSnapshot)
  const expansion = tree.getFeature<{ toggle(key: string | number): void }>('expansion')
  const selection = tree.getFeature<{ toggle(key: string | number): void }>('selection')
  return (
    <section className="grid w-full gap-space-sm">
      <p className="text-sm text-muted-foreground">纯 DOM 树：点击箭头展开，点击名称选择。</p>
      <div role="tree" aria-label="自定义 DOM 树" className="max-h-64 overflow-y-auto">
        {items.map((item) => {
          const expanded = snapshot.expandedKeys.includes(item.key)
          const selected = snapshot.selectedKeys.includes(item.key)
          return (
            <div
              key={item.key}
              role="treeitem"
              aria-level={item.depth + 1}
              aria-expanded={item.isLeaf ? undefined : expanded}
              aria-selected={selected}
              className="flex min-h-8 items-center gap-2"
              style={{ paddingInlineStart: item.depth * 20 }}
            >
              {item.isLeaf ? (
                <span className="size-6 shrink-0" />
              ) : (
                <button
                  type="button"
                  className="size-6 shrink-0 rounded hover:bg-muted"
                  aria-label={'展开或收起 ' + item.data.title}
                  aria-expanded={expanded}
                  onClick={() => expansion?.toggle(item.key)}
                >
                  {expanded ? '−' : '+'}
                </button>
              )}
              <button
                type="button"
                className="rounded px-2 py-1 hover:bg-muted"
                style={selected ? { background: '#ede9fe', color: '#6d28d9' } : undefined}
                onClick={() => selection?.toggle(item.key)}
              >
                {String(item.data.title)}
              </button>
            </div>
          )
        })}
      </div>
      <output className="text-sm" aria-live="polite">
        已选：
        {snapshot.selectedKeys
          .map((key) => String(tree.getItem(key)?.data.title ?? key))
          .join('、') || '无'}
      </output>
    </section>
  )
}
