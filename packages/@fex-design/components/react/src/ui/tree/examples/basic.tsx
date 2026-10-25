import { StateDemo } from './state-demo'
import { Tree } from '@fex-design/react/ui/tree'
import { treeDemoData } from './_data/tree-demo'

function Basic() {
  return (
    <Tree
      treeData={treeDemoData}
      defaultExpandedKeys={['root-1', 'root-1-group-1']}
      className="w-full max-w-xl rounded-md bg-background p-2"
    />
  )
}

export default function Example() {
  return (
    <div className="grid w-full gap-space-lg">
      <section className="grid gap-space-sm">
        <h3 className="font-medium">基本展示</h3>
        <div className="h-48 overflow-y-auto">
          <Basic />
        </div>
      </section>
      <StateDemo kind="expanded" controlled={false} />
      <StateDemo kind="expanded" controlled />
    </div>
  )
}
