import type { TreeDataNode } from '@fex-design/react/primitive/tree'
import {
  expansionFeature,
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
} from '@fex-design/react/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
export default function TreeDirectionPrimitiveExample() {
  return (
    <div className="grid w-full gap-space-lg">
      {(['ltr', 'rtl'] as const).map((direction) => (
        <section key={direction} className="grid gap-space-sm">
          <h3 className="font-medium">
            {direction === 'ltr' ? 'LTR · 从左向右' : 'RTL · 从右向左'}
          </h3>
          <div dir={direction} className="h-64 overflow-y-auto">
            <TreeRoot
              options={{
                treeData: treeDemoData,
                features: [
                  expansionFeature<TreeDataNode<string, string>>({
                    defaultExpandedKeys: ['root-1', 'root-1-group-1'],
                  }),
                ],
              }}
            >
              <TreeViewport>
                {(item) => (
                  <TreeItem key={item.key} itemKey={item.key}>
                    {(state) => (
                      <div {...state.itemProps}>
                        <TreeTrigger itemKey={item.key} />
                        <TreeTitle>{String(item.data.title)}</TreeTitle>
                      </div>
                    )}
                  </TreeItem>
                )}
              </TreeViewport>
            </TreeRoot>
          </div>
        </section>
      ))}
    </div>
  )
}
