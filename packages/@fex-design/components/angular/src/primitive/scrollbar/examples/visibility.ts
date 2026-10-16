import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb } from '@fex-design/angular/primitive/scrollbar'

@Component({
  selector: 'scrollbar-visibility-example', standalone: true,
  imports: [ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb], changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './visibility.html',
})
export class ScrollbarVisibilityExample {
  readonly lines = scrollbarDemoLines
}
