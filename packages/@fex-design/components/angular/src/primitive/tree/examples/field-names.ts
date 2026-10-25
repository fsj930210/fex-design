import { ChevronDownIcon } from '@fex-design/angular/icons/chevron-down'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  selectionFeature,
} from '@fex-design/angular/primitive/tree'
import { organizationTreeData, type OrganizationTreeNode } from './_data/tree-demo'
@Component({
  selector: 'tree-field-names-example',
  standalone: true,
  imports: [ChevronDownIcon, TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './field-names.html',
})
export class TreeFieldNamesExample {
  readonly data = organizationTreeData
  readonly fieldNames = { key: 'id', title: 'name', isLeaf: 'leaf', disabled: 'unavailable' }
  readonly expanded = ['engineering', 'frontend']
  readonly selected = signal<readonly (string | number)[]>([])
  readonly options = {
    treeData: this.data,
    fieldNames: this.fieldNames,
    defaultExpandedKeys: this.expanded,
    features: [expansionFeature<OrganizationTreeNode>(), selectionFeature<OrganizationTreeNode>()],
    onSelectedKeysChange: (keys: readonly (string | number)[]) => this.selected.set(keys),
  }
}
