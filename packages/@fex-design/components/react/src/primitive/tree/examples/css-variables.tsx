import type { TreeDataNode } from '@fex-design/react/primitive/tree'
import type { CSSProperties } from 'react'
import { treeDemoData } from './_data/tree-demo'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  selectionFeature,
} from '@fex-design/react/primitive/tree'

const customStyle = {
  '--tree-title-color': '#475569',
  '--tree-hover-background': '#fef3c7',
  '--tree-selected-background': '#ede9fe',
  '--tree-selected-color': '#7c3aed',
  '--tree-drop-indicator-color': '#7c3aed',
} as CSSProperties

export default function CssVariablesExample() {
  return (
    <div className="grid w-full gap-space-lg">
      {[false, true].map((custom) => (
        <section key={String(custom)} className="grid gap-space-sm">
          <h3 className="font-medium">
            {custom ? '自定义：紫色选中态、黄色悬停背景' : '默认主题'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {custom
              ? '标题为灰蓝色；悬停任意节点比较背景，点击节点比较选中颜色。'
              : '使用全局语义色。两组使用相同数据和选中节点。'}
          </p>
          <TreeRoot
            style={custom ? customStyle : undefined}
            options={{
              treeData: treeDemoData.slice(0, 1).map((node) => ({
                ...node,
                children: (node.children ?? []).slice(0, 1).map((group) => ({
                  ...group,
                  children: (group.children ?? []).slice(0, 2),
                })),
              })),
              defaultSelectedKeys: ['root-1-group-1-item-1'],
              features: [
                expansionFeature<TreeDataNode<string, string>>({
                  defaultExpandedKeys: ['root-1', 'root-1-group-1'],
                }),
                selectionFeature<TreeDataNode<string, string>>(),
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
        </section>
      ))}
      <p className="text-xs text-muted-foreground">
        --tree-drop-indicator-color 用于拖拽指示器；本例展示标题、hover 与选中态变量。
      </p>
    </div>
  )
}
