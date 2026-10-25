import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
} from '@fex-design/angular/primitive/tree'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import {
  filterTreeDemoData,
  getTreeSearchExpandedKeys,
  splitTreeSearchTitle,
} from './_data/tree-search-demo'
@Component({
  selector: 'tree-sync-search-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle, InputRoot, InputControl],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sync-search.html',
})
export class SyncSearch {
  readonly keyword = signal('')
  readonly expandedKeys = signal<readonly (string | number)[]>([])
  search(value: string) {
    this.keyword.set(value)
    this.expandedKeys.set(getTreeSearchExpandedKeys(value))
  }
  readonly features = [expansionFeature<TreeDataNode<string, string>>()]
  readonly options = computed(() => ({
    treeData: filterTreeDemoData(this.keyword()),
    expandedKeys: this.expandedKeys(),
    onExpandedKeysChange: (keys: readonly (string | number)[]) => this.expandedKeys.set(keys),
    features: this.features,
  }))
  readonly split = splitTreeSearchTitle
  toggle(tree: { getFeature<T>(id: string): T | undefined }, key: string | number) {
    tree.getFeature<{ toggle(key: string | number): void }>('expansion')?.toggle(key)
  }
}
