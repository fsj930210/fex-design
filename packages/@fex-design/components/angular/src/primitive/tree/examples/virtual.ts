import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core'
import {
  TreeRoot,
  TreeVirtualViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  focusFeature,
} from '@fex-design/angular/primitive/tree'
import { Button } from '@fex-design/angular/primitive/button'
import {
  virtualTreeDemoData,
  virtualTreeExpandedKeys,
  virtualTreeTargetKey,
  virtualTreeNodeCount,
} from './_data/tree-virtual-demo'
@Component({
  selector: 'tree-virtual-example',
  standalone: true,
  imports: [TreeRoot, TreeVirtualViewport, TreeItem, TreeTrigger, TreeTitle, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './virtual.html',
})
export class PrimitiveTreeVirtualExample {
  readonly options = {
    treeData: virtualTreeDemoData,
    defaultExpandedKeys: virtualTreeExpandedKeys,
    features: [
      expansionFeature<TreeDataNode<string, string>>(),
      focusFeature<TreeDataNode<string, string>>(),
    ],
  }
  readonly viewport = viewChild(TreeVirtualViewport)
  readonly target = virtualTreeTargetKey
  readonly count = virtualTreeNodeCount
}
