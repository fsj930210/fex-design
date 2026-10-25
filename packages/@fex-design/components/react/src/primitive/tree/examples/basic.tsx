import type { TreeDataNode } from '@fex-design/react/primitive/tree'
import { StateDemo } from './state-demo'
import { expansionFeature } from '@fex-design/react/primitive/tree'
import {
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
} from '@fex-design/react/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
function Basic() {
  return (
    <TreeRoot
      className="w-full max-w-xl rounded-md bg-background p-2"
      options={{
        treeData: treeDemoData,
        features: [
          expansionFeature<TreeDataNode<string, string>>({
            defaultExpandedKeys: ['root-1', 'root-1-group-1'],
          }),
        ],
      }}
    >
      {(tree) => (
        <TreeViewport>
          {(item) => (
            <TreeItem itemKey={item.key}>
              {(state) => (
                <div {...state.itemProps}>
                  <TreeTrigger itemKey={state.item.key} />
                  <TreeTitle>{String(state.item.data.title)}</TreeTitle>
                </div>
              )}
            </TreeItem>
          )}
        </TreeViewport>
      )}
    </TreeRoot>
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
