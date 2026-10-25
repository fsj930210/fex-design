import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { expansionFeature } from '@fex-design/angular/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
import {
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
} from '@fex-design/angular/primitive/tree'
@Component({
  selector: 'tree-basic-content-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    '<div treeRoot [options]="options" class="w-full max-w-xl rounded-md bg-background p-2"><div treeViewport><ng-template let-item><div [treeItem]="item.key"><button [treeTrigger]="item.key"></button><span treeTitle>{{item.data.title}}</span></div></ng-template></div></div>',
})
export class BasicContent {
  readonly options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
    ],
  }
}
