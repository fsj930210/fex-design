import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core'
import {
  createScrollbar,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/angular/primitive/scrollbar'

@Component({
  selector: 'scrollbar-custom-logic-example',
  standalone: true,
  imports: [ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-logic.html',
})
export class ScrollbarCustomLogicExample {
  readonly lines = scrollbarDemoLines

  readonly root = viewChild<ElementRef<HTMLDivElement>>('root')
  readonly binding = createScrollbar(
    () => ({ autoHide: 'never' }),
    () => this.root()?.nativeElement,
  )
}
