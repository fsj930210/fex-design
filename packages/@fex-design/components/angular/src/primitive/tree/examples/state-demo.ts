import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  type OnInit,
} from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  TreeCheckbox,
  expansionFeature,
  selectionFeature,
  checkFeature,
} from '@fex-design/angular/primitive/tree'
import { Button } from '@fex-design/angular/primitive/button'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-state-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, TreeTrigger, TreeTitle, TreeCheckbox, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './state-demo.html',
})
export class StateDemo implements OnInit {
  readonly data = input<readonly Record<string, unknown>[]>(treeDemoData)
  readonly kind = input<'expanded' | 'selected' | 'checked'>('selected')
  readonly controlled = input(false)
  readonly multiple = input(false)
  readonly strict = input(false)
  readonly keys = signal<readonly (string | number)[]>([])
  readonly initial = computed(() =>
    this.kind() === 'expanded' ? ['root-1'] : ['root-1-group-1-item-1'],
  )
  ngOnInit() {
    this.keys.set(this.initial())
  }
  readonly change = (keys: readonly (string | number)[]) => this.keys.set(keys)
  readonly options = computed(() => ({
    treeData: this.data(),
    features: [
      expansionFeature<Record<string, unknown>>(),
      ...(this.kind() === 'selected'
        ? [selectionFeature<Record<string, unknown>>({ multiple: this.multiple() })]
        : []),
      ...(this.kind() === 'checked'
        ? [
            checkFeature<Record<string, unknown>>({
              mode: this.strict() ? 'strict' : 'cascade',
            }),
          ]
        : []),
    ],
    ...(this.kind() !== 'expanded' ? { defaultExpandedKeys: ['root-1', 'root-1-group-1'] } : {}),
    ...(this.controlled()
      ? { [this.kind() + 'Keys']: this.keys() }
      : {
          ['default' + this.kind()[0]!.toUpperCase() + this.kind().slice(1) + 'Keys']:
            this.initial(),
        }),
    ...(this.kind() === 'expanded' ? { onExpandedKeysChange: this.change } : {}),
    ...(this.kind() === 'selected' ? { onSelectedKeysChange: this.change } : {}),
    ...(this.kind() === 'checked' ? { onCheckedKeysChange: this.change } : {}),
  }))
  append() {
    const additions =
      this.kind() === 'expanded'
        ? ['root-2', 'root-2-group-3']
        : this.multiple()
          ? ['root-1-group-1-item-1', 'root-1-group-1-item-2']
          : ['root-1-group-1-item-2']
    this.keys.update((current) =>
      this.kind() === 'selected' && !this.multiple()
        ? additions
        : [...new Set([...current, ...additions])],
    )
  }
}
