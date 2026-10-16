import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '@fex-design/angular/ui/scrollbar'

@Component({
  selector: 'scrollbar-parts-example', standalone: true,
  imports: [ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner], changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './parts.html',
})
export class ScrollbarPartsExample {
  readonly lines = scrollbarDemoLines
}
