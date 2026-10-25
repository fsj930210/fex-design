import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-keyboard-example',
  standalone: true,
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './keyboard.html',
})
export class TreeKeyboardExample {
  readonly selected = signal<readonly (string | number)[]>([])
  readonly checked = signal<readonly (string | number)[]>([])
  readonly treeProps = {
    treeData: treeDemoData,
    defaultExpandedKeys: ['root-1', 'root-1-group-1'],
    onSelect: (keys: readonly (string | number)[]) => this.selected.set(keys),
    onCheck: (keys: readonly (string | number)[]) => this.checked.set(keys),
  }
}
