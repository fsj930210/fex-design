import { For } from 'solid-js'
import { Tree } from '@fex-design/solid/ui/tree'
import { treeDemoData } from './_data/tree-demo'
export default function Example() {
  const treeProps = { treeData: treeDemoData, defaultExpandedKeys: ['root-1', 'root-1-group-1'] }
  return (
    <div class="grid w-full gap-space-lg">
      <For each={['ltr', 'rtl'] as const}>
        {(direction) => (
          <section class="grid gap-space-sm">
            <h3 class="font-medium">{direction === 'ltr' ? 'LTR · 从左向右' : 'RTL · 从右向左'}</h3>
            <div dir={direction} class="h-64 overflow-y-auto">
              <Tree {...treeProps} />
            </div>
          </section>
        )}
      </For>
    </div>
  )
}
