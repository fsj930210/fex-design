import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-css-variables-example',
  standalone: true,
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class TreeCssVariablesExample {
  readonly treeProps = {
    treeData: treeDemoData
      .slice(0, 1)
      .map((node) => ({
        ...node,
        children: (node.children ?? [])
          .slice(0, 1)
          .map((group) => ({ ...group, children: (group.children ?? []).slice(0, 2) })),
      })),
    defaultSelectedKeys: ['root-1-group-1-item-1'],
    defaultExpandedKeys: ['root-1', 'root-1-group-1'],
  }
  readonly customStyle =
    '--tree-title-color:#475569;--tree-hover-background:#fef3c7;--tree-selected-background:#ede9fe;--tree-selected-color:#7c3aed;--tree-drop-indicator-color:#7c3aed'
}
