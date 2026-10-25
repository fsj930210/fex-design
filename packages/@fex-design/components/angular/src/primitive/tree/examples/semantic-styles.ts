import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  expansionFeature,
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
} from '@fex-design/angular/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-semantic-styles-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div treeRoot [options]="options">
    <div treeViewport>
      <ng-template let-item
        ><div [treeItem]="item.key" [treeBlock]="true">
          <button [treeTrigger]="item.key"></button><span treeTitle>{{ item.data.title }}</span>
        </div></ng-template
      >
    </div>
  </div>`,
})
export class PrimitiveTreeSemanticStylesExample {
  readonly expanded = ['root-1', 'root-1-group-1']
  readonly options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({ defaultExpandedKeys: this.expanded }),
    ],
  }
}
