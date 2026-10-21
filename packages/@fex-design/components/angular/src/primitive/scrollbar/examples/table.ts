import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '@fex-design/angular/primitive/scrollbar'
import {
  scrollbarColumns,
  scrollbarRows,
  observeScrollbarHeader,
} from '@fex-design/docs-shared/scrollbar-demo'

@Component({
  selector: 'scrollbar-table-example',
  standalone: true,
  imports: [
    ScrollbarRoot,
    ScrollbarViewport,
    ScrollbarBar,
    ScrollbarTrack,
    ScrollbarThumb,
    ScrollbarCorner,
  ],
  templateUrl: './table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollbarTableExample {
  readonly columns = scrollbarColumns
  readonly rows = scrollbarRows
  private readonly root = viewChild.required(ScrollbarRoot)
  private readonly header = viewChild.required<ElementRef<HTMLTableSectionElement>>('header')
  private readonly destroyRef = inject(DestroyRef)
  constructor() {
    afterNextRender(() => {
      const cleanup = observeScrollbarHeader(this.root().element, this.header().nativeElement)
      this.destroyRef.onDestroy(cleanup)
    })
  }
}
