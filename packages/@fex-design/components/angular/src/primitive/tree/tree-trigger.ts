import { ChevronDownIcon } from '@fex-design/angular/icons/chevron-down'
import {
  Component,
  ChangeDetectionStrategy,
  computed,
  HostListener,
  inject,
  input,
} from '@angular/core'
import type { AsyncLoadFeatureApi } from '@fex-design/core/tree/features/async-load'
import type { ExpansionFeatureApi } from '@fex-design/core/tree/features/expansion'
import type { TreeKey, TreeNodeData } from '@fex-design/core/tree/types'
import { treeTriggerClassName } from '@fex-design/components-styles/tree'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { TreeRoot } from './tree-root'
@Component({
  selector: 'button[treeTrigger]',
  standalone: true,
  imports: [ChevronDownIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content><svg chevronDownIcon class="size-4"></svg></ng-content>`,
  host: {
    type: 'button',
    '[attr.tabindex]': 'root.tree().hasFeature("keyboard") ? -1 : null',
    '[attr.data-slot]': 'leaf() ? "tree-trigger-placeholder" : "tree-trigger"',
    '[attr.aria-hidden]': 'leaf() || null',
    '[style.visibility]': 'leaf() ? "hidden" : null',
    '[class]': 'hostClassName()',
    '[attr.aria-expanded]': 'expanded()',
    '[disabled]': 'leaf() || node()?.disabled || null',
  },
})
export class TreeTrigger<T extends TreeNodeData = TreeNodeData> {
  readonly root = inject<TreeRoot<T>>(TreeRoot)
  readonly key = input.required<TreeKey>({ alias: 'treeTrigger' })
  readonly node = computed(() => this.root.snapshot().items.get(this.key()))
  readonly leaf = computed(
    () => !this.node() || this.node()!.isLeaf || !this.root.tree().hasFeature('expansion'),
  )
  readonly expanded = computed(() => this.root.snapshot().expandedKeys.includes(this.key()))
  protected readonly hostClassName = createHostClassName(() =>
    this.leaf() ? 'inline-flex size-5 shrink-0 pointer-events-none' : treeTriggerClassName,
  )
  @HostListener('click', ['$event']) trigger(event: MouseEvent) {
    event.stopPropagation()
    if (event.defaultPrevented || this.leaf() || this.node()?.disabled) return
    const tree = this.root.tree()
    const expansion = tree.getFeature<ExpansionFeatureApi>('expansion')
    if (this.expanded()) {
      expansion?.collapse(this.key())
      return
    }
    const loading = tree.getFeature<AsyncLoadFeatureApi>('async-load')?.load(this.key())
    if (!loading) expansion?.expand(this.key())
    else
      void loading.then((result) => {
        if ((result as { ok?: boolean } | undefined)?.ok) expansion?.expand(this.key())
      })
  }
}
