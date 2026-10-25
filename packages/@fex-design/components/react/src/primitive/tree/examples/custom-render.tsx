import type { TreeDataNode } from '@fex-design/react/primitive/tree'
import { useState } from 'react'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  expansionFeature,
} from '@fex-design/react/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
export default function Example() {
  const [options] = useState(() => ({
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
    ],
  }))
  return (
    <section className="grid w-full gap-space-sm">
      <p className="text-sm text-muted-foreground">
        自定义行内容：名称、唯一 key 和层级；加减按钮展开或收起。
      </p>
      <div className="h-64 overflow-auto">
        <TreeRoot options={options}>
          {(tree) => (
            <TreeViewport>
              {(item) => (
                <TreeItem key={item.key} itemKey={item.key}>
                  {(state) => (
                    <div {...state.itemProps}>
                      <div className="flex min-w-0 items-center gap-2">
                        {item.isLeaf ? (
                          <span className="size-5 shrink-0" />
                        ) : (
                          <button
                            type="button"
                            className="size-5 shrink-0 rounded hover:bg-muted"
                            aria-expanded={tree.getSnapshot().expandedKeys.includes(item.key)}
                            aria-label={'展开或收起 ' + item.data.title}
                            onClick={(event) => {
                              event.stopPropagation()
                              tree
                                .getFeature<{ toggle(key: string | number): void }>('expansion')
                                ?.toggle(item.key)
                            }}
                          >
                            {tree.getSnapshot().expandedKeys.includes(item.key) ? '−' : '+'}
                          </button>
                        )}
                        <span className="font-medium">{String(item.data.title)}</span>
                        <code className="text-xs text-muted-foreground">{String(item.key)}</code>
                        <span className="text-xs text-muted-foreground">depth {item.depth}</span>
                      </div>
                    </div>
                  )}
                </TreeItem>
              )}
            </TreeViewport>
          )}
        </TreeRoot>
      </div>
    </section>
  )
}
