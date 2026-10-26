import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  type OnInit,
} from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { Button } from '@fex-design/angular/ui/button'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-state-example',
  standalone: true,
  imports: [Tree, Button],
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
