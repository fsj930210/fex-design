import {
  expansionFeature,
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
} from '@fex-design/react/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
export default function TreeSemanticPrimitiveExample() {
  return (
    <TreeRoot
      className="w-full max-w-xl rounded-md-primary/40 bg-muted/20 p-3"
      options={{
        treeData: treeDemoData,
        features: [
          expansionFeature<Record<string, unknown>>({
            defaultExpandedKeys: ['root-1', 'root-1-group-1'],
          }),
        ],
      }}
    >
      <TreeViewport>
        {(item) => (
          <TreeItem key={item.key} itemKey={item.key}>
            {(state) => (
              <div
                {...state.itemProps}
                className="flex w-full items-center rounded-md px-2 py-1 text-primary"
              >
                <TreeTrigger itemKey={item.key} />
                <TreeTitle>{String(item.data.title)}</TreeTitle>
              </div>
            )}
          </TreeItem>
        )}
      </TreeViewport>
    </TreeRoot>
  )
}
