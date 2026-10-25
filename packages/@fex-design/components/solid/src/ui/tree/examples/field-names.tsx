import { createSignal } from 'solid-js'
import { Tree } from '@fex-design/solid/ui/tree'
import { organizationTreeData } from './_data/tree-demo'
const fieldNames = { key: 'id', title: 'name', isLeaf: 'leaf', disabled: 'unavailable' }
export default function FieldNamesExample() {
  const [selected, setSelected] = createSignal<readonly (string | number)[]>([])
  return (
    <section class="grid w-full gap-space-sm">
      <p class="text-xs text-muted-foreground">
        id → key；name → title；leaf → isLeaf；unavailable → disabled。
      </p>
      <div class="max-h-64 overflow-y-auto">
        <Tree
          treeData={organizationTreeData}
          fieldNames={fieldNames}
          defaultExpandedKeys={['engineering', 'frontend']}
          onSelect={(keys) => setSelected(keys)}
        />
      </div>
      <output class="min-h-5 break-all text-xs text-muted-foreground" aria-live="polite">
        已选 ID：{selected().join(', ') || '无'}
      </output>
    </section>
  )
}
