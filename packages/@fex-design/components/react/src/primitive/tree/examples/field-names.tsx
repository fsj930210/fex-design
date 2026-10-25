import { useState } from 'react'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  selectionFeature,
} from '@fex-design/react/primitive/tree'
import { organizationTreeData, type OrganizationTreeNode } from './_data/tree-demo'

const fieldNames = { key: 'id', title: 'name', isLeaf: 'leaf', disabled: 'unavailable' }
export default function FieldNamesExample() {
  const [selected, setSelected] = useState<readonly (string | number)[]>([])
  const [options] = useState(() => ({
    treeData: organizationTreeData,
    fieldNames,
    defaultExpandedKeys: ['engineering', 'frontend'],
    features: [expansionFeature<OrganizationTreeNode>(), selectionFeature<OrganizationTreeNode>()],
    onSelectedKeysChange: setSelected,
  }))
  return (
    <section className="grid w-full gap-space-sm">
      <p className="text-xs text-muted-foreground">
        id → key；name → title；leaf → isLeaf；unavailable → disabled。
      </p>
      <div className="max-h-64 overflow-y-auto">
        <TreeRoot options={options}>
          <TreeViewport>
            {(item) => (
              <TreeItem key={item.key} itemKey={item.key}>
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
      <output className="min-h-5 break-all text-xs text-muted-foreground" aria-live="polite">
        已选 ID：{selected.join(', ') || '无'}
      </output>
    </section>
  )
}
