import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { organizationTreeData } from './_data/tree-demo'
@Component({
  selector: 'tree-field-names-example',
  standalone: true,
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './field-names.html',
})
export class TreeFieldNamesExample {
  readonly data = organizationTreeData
  readonly fieldNames = { key: 'id', title: 'name', isLeaf: 'leaf', disabled: 'unavailable' }
  readonly expanded = ['engineering', 'frontend']
  readonly selected = signal<readonly (string | number)[]>([])
}
