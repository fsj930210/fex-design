import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  TreeCheckbox,
  expansionFeature,
  focusFeature,
  keyboardFeature,
  selectionFeature,
  checkFeature,
} from '@fex-design/angular/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-keyboard-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle, TreeCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './keyboard.html',
})
export class PrimitiveTreeKeyboardExample {
  readonly focused = signal<string | number | null>(null)
  readonly selected = signal<readonly (string | number)[]>([])
  readonly checked = signal<readonly (string | number)[]>([])
  readonly options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<Record<string, unknown>>({
        defaultExpandedKeys: ['root-1', 'root-1-group-1'],
      }),
      focusFeature<Record<string, unknown>>(),
      keyboardFeature<Record<string, unknown>>(),
      selectionFeature<Record<string, unknown>>(),
      checkFeature<Record<string, unknown>>(),
    ],
    onFocusedKeyChange: (key: string | number | null) => this.focused.set(key),
    onSelectedKeysChange: (keys: readonly (string | number)[]) => this.selected.set(keys),
    onCheckedKeysChange: (keys: readonly (string | number)[]) => this.checked.set(keys),
  }
}
