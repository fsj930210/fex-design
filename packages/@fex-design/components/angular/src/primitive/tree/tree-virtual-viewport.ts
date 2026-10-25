import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  inject,
  input,
  viewChild,
  TemplateRef,
} from '@angular/core'
import { injectVirtualizer } from '@tanstack/angular-virtual'
import type { TreeController, TreeNodeData, TreeVisibleItem } from '@fex-design/core/tree/types'
import { TreeRoot } from './tree-root'
@Component({
  selector: 'div[treeVirtualViewport]',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block', 'data-slot': 'tree-virtual-viewport' },
  templateUrl: './tree-virtual-viewport.html',
})
export class TreeVirtualViewport<T extends TreeNodeData = TreeNodeData> {
  readonly root = inject<TreeRoot<T>>(TreeRoot)
  readonly height = input.required<number>()
  readonly overscan = input(6)
  readonly template =
    contentChild.required<TemplateRef<{ $implicit: TreeVisibleItem<T>; tree: TreeController<T> }>>(
      TemplateRef,
    )
  readonly scrollElement = viewChild<ElementRef<HTMLDivElement>>('scrollElement')
  readonly virtualizer = injectVirtualizer<HTMLDivElement, HTMLDivElement>(() => ({
    scrollElement: this.scrollElement(),
    count: this.root.visibleItems().length,
    estimateSize: () => this.root.rowHeight(),
    overscan: this.overscan(),
    getItemKey: (index) => this.root.visibleItems()[index]?.key ?? index,
  }))
  scrollTo(
    key: string | number,
    options?: { align?: 'auto' | 'start' | 'center' | 'end'; reveal?: boolean },
  ) {
    if (options?.reveal) this.root.tree().getFeature<any>('focus')?.reveal(key)
    const index = this.root.tree().getVisibleIndex(key)
    if (index === undefined || index < 0) return false
    this.virtualizer.scrollToIndex(index, { align: options?.align ?? 'auto' })
    return true
  }
}
