import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { Button } from '@fex-design/angular/ui/button'
import {
  virtualTreeDemoData,
  virtualTreeExpandedKeys,
  virtualTreeTargetKey,
  virtualTreeNodeCount,
} from './_data/tree-virtual-demo'
@Component({
  selector: 'tree-virtual-example',
  standalone: true,
  imports: [Tree, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './virtual.html',
})
export class TreeVirtualExample {
  readonly treeProps = {
    treeData: virtualTreeDemoData,
    defaultExpandedKeys: virtualTreeExpandedKeys,
  }
  readonly viewport = viewChild(Tree)
  readonly target = virtualTreeTargetKey
  readonly count = virtualTreeNodeCount
}
