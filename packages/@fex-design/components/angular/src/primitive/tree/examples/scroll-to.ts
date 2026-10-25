import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  focusFeature,
} from '@fex-design/angular/primitive/tree'
import { Button } from '@fex-design/angular/primitive/button'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-scroll-to-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-to.html',
})
export class PrimitiveTreeScrollToExample {
  readonly options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>(),
      focusFeature<TreeDataNode<string, string>>(),
    ],
  }
  readonly viewport = viewChild(TreeViewport)
  readonly message = signal('')
  locate() {
    const found = this.viewport()?.scrollTo('root-2-group-3-item-3', { reveal: true })
    this.message.set(found ? '已定位 Item 2.3.3' : '未能定位目标节点')
  }
}
