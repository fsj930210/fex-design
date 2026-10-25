import type { TreeDataNode } from '@fex-design/angular/ui/tree'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Tree, type TreeDragEventContext } from '@fex-design/angular/ui/tree'
import { treeDndDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-dnd-example',
  standalone: true,
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dnd.html',
})
export class TreeDndExample {
  readonly treeProps = {
    treeData: treeDndDemoData,
    defaultExpandedKeys: ['root-1', 'root-1-group-1'],
  }
  readonly message = signal('Item 1.1.2 不可拖动；Item 1.1.3 不可放置。其他节点可拖放。')
  readonly handleDrop = ({
    sourceItem,
    targetItem,
    intent,
  }: TreeDragEventContext<TreeDataNode<string, string>>) => {
    if (!intent?.valid) return
    this.message.set(
      `${String(sourceItem?.data.title)} → ${String(targetItem?.data.title)}（${intent.position === 'inside' ? '成为子节点' : '排在其后'}）`,
    )
  }
}
