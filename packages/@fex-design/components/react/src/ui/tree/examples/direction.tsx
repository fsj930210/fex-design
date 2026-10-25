import { Tree } from '@fex-design/react/ui/tree'

import { treeDemoData } from './_data/tree-demo'
export default function TreeDirectionExample() {
  return (
    <div className="grid w-full gap-space-lg">
      {(['ltr', 'rtl'] as const).map((direction) => (
        <section key={direction} className="grid gap-space-sm">
          <h3 className="font-medium">
            {direction === 'ltr' ? 'LTR · 从左向右' : 'RTL · 从右向左'}
          </h3>
          <div dir={direction} className="h-64 overflow-y-auto">
            <Tree treeData={treeDemoData} defaultExpandedKeys={['root-1', 'root-1-group-1']} />
          </div>
        </section>
      ))}
    </div>
  )
}
