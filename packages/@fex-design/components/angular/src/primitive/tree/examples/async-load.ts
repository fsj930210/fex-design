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
  readonly treeData = signal<readonly Record<string, unknown>[]>(asyncTreeDemoData)
  readonly features = [
    expansionFeature<Record<string, unknown>>(),
    asyncLoadFeature<Record<string, unknown>>({
      loadChildren: async (item) => {
        const children = await new Promise<readonly Record<string, unknown>[]>((resolve) =>
          setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
        )
        this.treeData.update((current) => updateRemoteChildren(current, String(item.key), children))
      },
    }),
  ]
  readonly options = computed(() => ({ treeData: this.treeData(), features: this.features }))
}
