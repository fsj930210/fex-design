import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
} from '@fex-design/angular/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-direction-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class PrimitiveTreeDirectionExample {
  readonly directions = ['ltr', 'rtl'] as const
  readonly options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<Record<string, unknown>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
    ],
  }
}
