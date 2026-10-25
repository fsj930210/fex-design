import type { TreeDataNode } from '@fex-design/angular/ui/tree'
import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import { createTreeSignals, expansionFeature, selectionFeature } from '@fex-design/angular/ui/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-logic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logic.html',
})
export class TreeLogicExample {
  private readonly options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      selectionFeature<TreeDataNode<string, string>>(),
    ],
  }
  readonly model = createTreeSignals(() => this.options)
  readonly selectedTitles = computed(
    () =>
      this.model
        .snapshot()
        .selectedKeys.map((key) => String(this.model.tree.getItem(key)?.data.title ?? key))
        .join('、') || '无',
  )
  toggle(key: string | number) {
    this.model.tree.getFeature<{ toggle(key: string | number): void }>('expansion')?.toggle(key)
  }
  select(key: string | number) {
    this.model.tree.getFeature<{ toggle(key: string | number): void }>('selection')?.toggle(key)
  }
}
