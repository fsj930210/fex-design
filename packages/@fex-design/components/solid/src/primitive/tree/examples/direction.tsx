import type { TreeDataNode } from '@fex-design/solid/primitive/tree'
import { For } from 'solid-js'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
} from '@fex-design/solid/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
export default function Example() {
  const options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
    ],
  }
  return (
    <div class="grid w-full gap-space-lg">
      <For each={['ltr', 'rtl'] as const}>
        {(direction) => (
          <section class="grid gap-space-sm">
            <h3 class="font-medium">{direction === 'ltr' ? 'LTR · 从左向右' : 'RTL · 从右向左'}</h3>
            <div dir={direction} class="h-64 overflow-y-auto">
              <TreeRoot options={options}>
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
          </section>
        )}
      </For>
    </div>
  )
}
