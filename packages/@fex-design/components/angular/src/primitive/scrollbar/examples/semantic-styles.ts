import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '@fex-design/angular/primitive/scrollbar'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
@Component({
  selector: 'scrollbar-semantic-styles-example',
  standalone: true,
  imports: [
    ScrollbarRoot,
    ScrollbarViewport,
    ScrollbarBar,
    ScrollbarTrack,
    ScrollbarThumb,
    ScrollbarCorner,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class ScrollbarSemanticStylesExample {
  readonly lines = scrollbarDemoLines
}
