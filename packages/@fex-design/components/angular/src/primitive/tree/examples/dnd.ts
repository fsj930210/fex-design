import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  TreeDndItem,
  dndFeature,
  expansionFeature,
  type TreeDragEventContext,
} from '@fex-design/angular/primitive/tree'
import { treeDndDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-dnd-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle, TreeDndItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dnd.html',
})
export class PrimitiveTreeDndExample {
  readonly options = {
    treeData: treeDndDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      dndFeature<TreeDataNode<string, string>>(),
    ],
  }
  readonly message = signal('Item 1.1.2 不可拖动；Item 1.1.3 不可放置。其他节点可拖放。')
  readonly callbacks = {
    onDrop: ({
      sourceItem,
      targetItem,
      intent,
    }: TreeDragEventContext<TreeDataNode<string, string>>) => {
      if (!intent?.valid) return
      this.message.set(
        `${String(sourceItem?.data.title)} → ${String(targetItem?.data.title)}（${intent.position === 'inside' ? '成为子节点' : '排在其后'}）`,
      )
    },
  }
}
