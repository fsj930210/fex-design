import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'

import { asyncTreeDemoData, createTreeDemoChildren } from './_data/tree-async-demo'
import { updateRemoteChildren } from './_data/tree-remote-demo'
@Component({
  selector: 'tree-async-load-example',
  standalone: true,
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './async-load.html',
})
export class TreeAsyncLoadExample {
  readonly treeData = signal<readonly Record<string, unknown>[]>(asyncTreeDemoData)

  readonly treeProps = computed(() => ({
    treeData: this.treeData(),
    loadChildren: async (item: { key: string | number }) => {
      const children = await new Promise<readonly Record<string, unknown>[]>((resolve) =>
        setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
      )
      this.treeData.update((current) => updateRemoteChildren(current, String(item.key), children))
    },
  }))
}
