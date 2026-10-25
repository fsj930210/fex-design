import { handleTreeKeyboard, focusTreeEntry } from '@fex-design/core/tree/keyboard-dom'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core'
import { createTreeController } from '@fex-design/core/tree/create-tree-controller'
import type { SelectionFeatureApi } from '@fex-design/core/tree/features/selection'
import type {
  TreeController,
  TreeNodeData,
  TreeOptions,
  TreeSnapshot,
  TreeVisibleItem,
} from '@fex-design/core/tree/types'
import { treeRootClassName } from '@fex-design/components-styles/tree'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

function emptySnapshot<T extends TreeNodeData>(): TreeSnapshot<T> {
  return {
    treeData: [],
    expandedKeys: [],
    selectedKeys: [],
    checkedKeys: [],
    focusedKey: null,
    items: new Map(),
    visibleItems: [],
  }
}

@Component({
  selector: 'div[treeRoot]',
  standalone: true,
  exportAs: 'treeRoot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'tree',
    '[attr.aria-disabled]': 'options()?.disabled || null',
    role: 'tree',
    tabindex: '0',
  },
  template: '<ng-content />',
})
export class TreeRoot<T extends TreeNodeData = TreeNodeData> {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef)
  readonly options = input<TreeOptions<T> | undefined>()
  readonly controller = input<TreeController<T> | undefined>()
  readonly indent = input(16)
  readonly rowHeight = input(32)
  private ownedController: TreeController<T> | undefined
  readonly tree = computed(
    () =>
      this.controller() ??
      (this.ownedController ??= createTreeController(this.options() ?? { treeData: [] })),
  )
  readonly snapshot = signal<TreeSnapshot<T>>(emptySnapshot<T>())
  readonly visibleItems = signal<readonly TreeVisibleItem<T>[]>([])
  protected readonly hostClassName = createHostClassName(treeRootClassName)
  protected readonly selection = () => this.tree().getFeature<SelectionFeatureApi>('selection')
  constructor() {
    effect((cleanup) => {
      const tree = this.tree()
      const options = this.options()
      if (options) tree.updateOptions(options)
      this.update(tree)
      const off = tree.subscribe(() => this.update(tree))
      cleanup(off)
    })
  }
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    handleTreeKeyboard(this.tree(), this.element.nativeElement, event)
  }
  @HostListener('focus', ['$event'])
  handleFocus(event: FocusEvent) {
    focusTreeEntry(this.tree(), this.element.nativeElement, event.target, event.relatedTarget)
  }
  private update(tree: TreeController<T>) {
    this.snapshot.set(tree.getSnapshot())
    this.visibleItems.set(tree.getVisibleItems())
  }
}
