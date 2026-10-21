import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/angular/primitive/scrollbar'

@Component({
  selector: 'scrollbar-interaction-example',
  standalone: true,
  imports: [ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './interaction.html',
})
export class ScrollbarInteractionExample {
  readonly lines = scrollbarDemoLines
}
