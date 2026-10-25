import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  expansionFeature,
} from '@fex-design/angular/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-custom-render-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-render.html',
})
export class PrimitiveTreeCustomRenderExample {
  readonly options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
    ],
  }
  toggle(tree: { getFeature<T>(id: string): T | undefined }, key: string | number) {
    tree.getFeature<{ toggle(key: string | number): void }>('expansion')?.toggle(key)
  }
}
