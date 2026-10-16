import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core'
import { Scrollbar, ScrollbarViewport } from '@fex-design/angular/ui/scrollbar'
import { scrollbarColumns, scrollbarRows, observeScrollbarHeader } from '@fex-design/docs-shared/scrollbar-demo'

@Component({
  selector: 'scrollbar-table-example', standalone: true,
  imports: [Scrollbar, ScrollbarViewport],
  templateUrl: './table.html', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollbarTableExample {
  readonly columns = scrollbarColumns
  readonly rows = scrollbarRows
  private readonly root = viewChild.required(Scrollbar)
  private readonly header = viewChild.required<ElementRef<HTMLTableSectionElement>>('header')
  private readonly destroyRef = inject(DestroyRef)
  constructor() {
    afterNextRender(() => {
      const cleanup = observeScrollbarHeader(this.root().element, this.header().nativeElement)
      this.destroyRef.onDestroy(cleanup)
    })
  }
}
