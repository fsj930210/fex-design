import { useState } from 'react'
import { Tree } from '@fex-design/react/ui/tree'
import { organizationTreeData } from './_data/tree-demo'

const fieldNames = { key: 'id', title: 'name', isLeaf: 'leaf', disabled: 'unavailable' }
export default function FieldNamesExample() {
  const [selected, setSelected] = useState<readonly (string | number)[]>([])
  return (
    <section className="grid w-full gap-space-sm">
      <p className="text-xs text-muted-foreground">
        id → key；name → title；leaf → isLeaf；unavailable → disabled。
      </p>
      <div className="max-h-64 overflow-y-auto">
        <Tree
          treeData={organizationTreeData}
          fieldNames={fieldNames}
          defaultExpandedKeys={['engineering', 'frontend']}
          onSelect={setSelected}
        />
      </div>
      <output className="min-h-5 break-all text-xs text-muted-foreground" aria-live="polite">
        已选 ID：{selected.join(', ') || '无'}
      </output>
    </section>
  )
}
