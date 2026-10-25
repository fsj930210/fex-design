import { ChevronDownIcon } from '@fex-design/angular/icons/chevron-down'
import { treeTriggerClassName, treeTitleClassName } from '@fex-design/components-styles/tree'

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { Input } from '@fex-design/angular/ui/input'
import {
  filterTreeDemoData,
  getTreeSearchExpandedKeys,
  splitTreeSearchTitle,
} from './_data/tree-search-demo'
@Component({
  selector: 'tree-sync-search-example',
  standalone: true,
  imports: [Tree, Input, ChevronDownIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sync-search.html',
})
export class SyncSearch {
  readonly keyword = signal('')
  readonly expandedKeys = signal<readonly (string | number)[]>([])
  readonly triggerClass = treeTriggerClassName
  readonly titleClass = treeTitleClassName
  search(value: string) {
    this.keyword.set(value)
    this.expandedKeys.set(getTreeSearchExpandedKeys(value))
  }

  readonly treeProps = computed(() => ({
    treeData: filterTreeDemoData(this.keyword()),
    expandedKeys: this.expandedKeys(),
  }))
  readonly split = splitTreeSearchTitle
  toggle(tree: { getFeature<T>(id: string): T | undefined }, key: string | number) {
    tree.getFeature<{ toggle(key: string | number): void }>('expansion')?.toggle(key)
  }
}
