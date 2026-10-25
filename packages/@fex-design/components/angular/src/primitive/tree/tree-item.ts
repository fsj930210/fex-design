import { Directive, computed, effect, HostListener, inject, input, signal } from '@angular/core'
import type { AsyncLoadFeatureApi } from '@fex-design/core/tree/features/async-load'
import type { CheckFeatureApi } from '@fex-design/core/tree/features/check'
import type { FocusFeatureApi } from '@fex-design/core/tree/features/focus'
import type { SelectionFeatureApi } from '@fex-design/core/tree/features/selection'
import type { TreeKey, TreeNodeData } from '@fex-design/core/tree/types'
import { treeItemClassName } from '@fex-design/components-styles/tree'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { TreeRoot } from './tree-root'

@Directive({
  selector: '[treeItem]',
  standalone: true,
  exportAs: 'treeItem',
  host: {
    '[class]': 'hostClassName()',
    '[attr.role]': "'treeitem'",
    '[attr.tabindex]': 'focused() ? 0 : -1',
    '[attr.aria-level]': 'item() ? item()!.depth + 1 : null',
    '[attr.aria-expanded]': 'item()?.isLeaf ? null : expanded()',
    '[attr.aria-selected]': 'selected() || null',
    '[attr.aria-disabled]': 'item()?.disabled || null',
    '[attr.data-key]': 'item()?.key',
    '[attr.data-selected]': 'selected() || null',
    '[attr.data-selectable]': 'selectable() || null',
    '[attr.data-expanded]': 'expanded() || null',
    '[attr.data-checked]': 'checked() || null',
    '[attr.data-disabled]': 'item()?.disabled || null',
    '[attr.data-leaf]': 'item()?.isLeaf || null',
    '[attr.data-block]': 'block() || null',
    '[style.margin-inline-start.px]': '(item()?.depth ?? 0) * root.indent()',
    '[style.height.px]': 'root.rowHeight()',
    '[style.padding-inline-start.px]': '4',
    'data-slot': 'tree-item',
  },
})
export class TreeItem<T extends TreeNodeData = TreeNodeData> {
  readonly root = inject<TreeRoot<T>>(TreeRoot)
  readonly key = input.required<TreeKey>({ alias: 'treeItem' })
  readonly block = input(false, { alias: 'treeBlock' })
  private readonly version = signal(0)
  readonly item = computed(() => {
    this.version()
    return this.root.tree().getItem(this.key())
  })
  readonly expanded = computed(() => {
    this.version()
    return this.root.tree().getSnapshot().expandedKeys.includes(this.key())
  })
  readonly selected = computed(() => {
    this.version()
    return this.root.tree().getSnapshot().selectedKeys.includes(this.key())
  })
  readonly selectable = computed(() =>
    Boolean(this.item()?.selectable && this.root.tree().hasFeature('selection')),
  )
  readonly checked = computed(() => {
    this.version()
    return this.root.tree().getSnapshot().checkedKeys.includes(this.key())
  })
  readonly checkedState = computed(() => {
    this.version()
    return this.root.tree().getFeature<CheckFeatureApi>('check')?.getState(this.key()) ?? false
  })
  readonly focused = computed(() => {
    this.version()
    return this.root.tree().getSnapshot().focusedKey === this.key()
  })
  readonly loadState = computed(() => {
    this.version()
    return (
      this.root.tree().getFeature<AsyncLoadFeatureApi>('async-load')?.getState(this.key()) ??
      'unloaded'
    )
  })
  protected readonly hostClassName = createHostClassName(() => treeItemClassName())
  constructor() {
    effect((cleanup) => {
      const off = this.root
        .tree()
        .subscribeNode(this.key(), () => this.version.update((v) => v + 1))
      cleanup(off)
    })
  }
  @HostListener('focus') focus() {
    this.root.tree().getFeature<FocusFeatureApi>('focus')?.focus(this.key())
  }
  @HostListener('click', ['$event']) select(event: MouseEvent) {
    if (!event.defaultPrevented && !this.item()?.disabled)
      this.root.tree().getFeature<SelectionFeatureApi>('selection')?.toggle(this.key())
  }
  toggleChecked() {
    this.root.tree().getFeature<CheckFeatureApi>('check')?.check(this.key(), !this.checked())
  }
}
