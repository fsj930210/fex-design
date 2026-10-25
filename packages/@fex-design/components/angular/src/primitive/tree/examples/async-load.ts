import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  asyncLoadFeature,
} from '@fex-design/angular/primitive/tree'
import { Spinner } from '@fex-design/angular/primitive/spinner'
import { asyncTreeDemoData, createTreeDemoChildren } from './_data/tree-async-demo'
import { updateRemoteChildren } from './_data/tree-remote-demo'
@Component({
  selector: 'tree-async-load-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle, Spinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './async-load.html',
})
export class PrimitiveTreeAsyncLoadExample {
  readonly treeData = signal<readonly TreeDataNode<string, string>[]>(asyncTreeDemoData)
  readonly features = [
    expansionFeature<TreeDataNode<string, string>>(),
    asyncLoadFeature<TreeDataNode<string, string>>({
      loadChildren: async (item) => {
        const children = await new Promise<readonly TreeDataNode<string, string>[]>((resolve) =>
          setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
        )
        this.treeData.update((current) => updateRemoteChildren(current, String(item.key), children))
        return children
      },
    }),
  ]
  readonly options = computed(() => ({ treeData: this.treeData(), features: this.features }))
}
