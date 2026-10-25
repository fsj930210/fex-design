import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  selectionFeature,
} from '@fex-design/angular/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-css-variables-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class PrimitiveTreeCssVariablesExample {
  readonly options = {
    treeData: treeDemoData
      .slice(0, 1)
      .map((node) => ({
        ...node,
        children: (node.children ?? [])
          .slice(0, 1)
          .map((group) => ({ ...group, children: (group.children ?? []).slice(0, 2) })),
      })),
    defaultSelectedKeys: ['root-1-group-1-item-1'],
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      selectionFeature<TreeDataNode<string, string>>(),
    ],
  }
  readonly customStyle =
    '--tree-title-color:#475569;--tree-hover-background:#fef3c7;--tree-selected-background:#ede9fe;--tree-selected-color:#7c3aed;--tree-drop-indicator-color:#7c3aed'
}
