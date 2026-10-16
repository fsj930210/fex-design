import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarCorner, ScrollbarTrack, ScrollbarThumb } from '@fex-design/angular/primitive/scrollbar'

@Component({
  selector: 'scrollbar-basic-example', standalone: true,
  imports: [ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarCorner, ScrollbarTrack, ScrollbarThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class ScrollbarBasicExample {
  readonly lines = scrollbarDemoLines
}
