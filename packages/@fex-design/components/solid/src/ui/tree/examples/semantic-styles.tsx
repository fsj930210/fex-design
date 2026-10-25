import { Tree } from '@fex-design/solid/ui/tree'
import { treeDemoData } from './_data/tree-demo'
export default function Example() {
  return (
    <div class="w-full min-w-0">
      <Tree
        treeData={treeDemoData.slice(0, 1)}
        defaultExpandedKeys={['root-1', 'root-1-group-1']}
        classNames={{
          root: 'w-full bg-slate-50',
          viewport: 'h-64 overflow-y-auto',
          title: 'font-medium',
          trigger: 'text-violet-600',
        }}
        styles={{
          root: { padding: '12px', 'border-radius': '12px' },
          title: { color: '#7c3aed' },
          item: { 'column-gap': '12px' },
        }}
      />
    </div>
  )
}
