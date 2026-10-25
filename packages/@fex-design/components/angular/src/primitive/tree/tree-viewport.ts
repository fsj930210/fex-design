import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  inject,
  Injector,
  afterNextRender,
  TemplateRef,
} from '@angular/core'
import type { TreeController, TreeNodeData, TreeVisibleItem } from '@fex-design/core/tree/types'
import { treeViewportClassName } from '@fex-design/components-styles/tree'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { TreeRoot } from './tree-root'
@Component({
  selector: 'div[treeViewport]',
  standalone: true,
  exportAs: 'treeViewport',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'tree-viewport' },
  templateUrl: './tree-viewport.html',
})
export class TreeViewport<T extends TreeNodeData = TreeNodeData> {
  private readonly injector = inject(Injector)
  readonly root = inject<TreeRoot<T>>(TreeRoot)
  readonly template =
    contentChild.required<TemplateRef<{ $implicit: TreeVisibleItem<T>; tree: TreeController<T> }>>(
      TemplateRef,
    )
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef)
  protected readonly hostClassName = createHostClassName(treeViewportClassName)
  scrollTo(
    key: string | number,
    options?: { reveal?: boolean; align?: 'auto' | 'start' | 'center' | 'end' },
  ) {
    if (options?.reveal && !this.root.tree().getFeature<any>('focus')?.reveal(key)) return false
    if (options?.reveal) {
      afterNextRender(() => this.scrollTo(key, { ...options, reveal: false }), {
        injector: this.injector,
      })
      return true
    }
    const item = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>('[data-key]'),
    ).find((node) => node.dataset.key === String(key))
    if (!item) return false
    item.scrollIntoView({
      block: options?.align === 'auto' ? 'nearest' : (options?.align ?? 'nearest'),
    })
    return true
  }
}
