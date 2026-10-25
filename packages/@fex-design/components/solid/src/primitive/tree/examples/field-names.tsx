import { createSignal } from 'solid-js'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  selectionFeature,
} from '@fex-design/solid/primitive/tree'
import { organizationTreeData, type OrganizationTreeNode } from './_data/tree-demo'
const fieldNames = { key: 'id', title: 'name', isLeaf: 'leaf', disabled: 'unavailable' }
export default function FieldNamesExample() {
  const [selected, setSelected] = createSignal<readonly (string | number)[]>([])
  const options = {
    treeData: organizationTreeData,
    fieldNames,
    defaultExpandedKeys: ['engineering', 'frontend'],
    features: [expansionFeature<OrganizationTreeNode>(), selectionFeature<OrganizationTreeNode>()],
    onSelectedKeysChange: (keys: readonly (string | number)[]) => setSelected(keys),
  }
  return (
    <section class="grid w-full gap-space-sm">
      <p class="text-xs text-muted-foreground">
        id → key；name → title；leaf → isLeaf；unavailable → disabled。
      </p>
      <div class="max-h-64 overflow-y-auto">
        <TreeRoot options={options}>
          <TreeViewport>
            {(item) => (
              <TreeItem itemKey={item.key}>
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
      <output class="min-h-5 break-all text-xs text-muted-foreground" aria-live="polite">
        已选 ID：{selected().join(', ') || '无'}
      </output>
    </section>
  )
}
