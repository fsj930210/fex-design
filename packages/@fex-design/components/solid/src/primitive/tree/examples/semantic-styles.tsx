import type { TreeDataNode } from '@fex-design/solid/primitive/tree'
import {
  expansionFeature,
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
} from '@fex-design/solid/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
export default function TreeSemanticPrimitiveExample() {
  return (
    <TreeRoot
      class="w-full max-w-xl rounded-md bg-background p-2"
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
                  <TreeTrigger itemKey={item.key} />
                  <TreeTitle>{String(item.data.title)}</TreeTitle>
                </div>
              )}
            </TreeItem>
          )}
        </TreeViewport>
      )}
    </TreeRoot>
  )
}
