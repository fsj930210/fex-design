import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '@fex-design/angular/primitive/scrollbar'

@Component({
  selector: 'scrollbar-css-variables-example',
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
  templateUrl: './css-variables.html',
})
export class ScrollbarCssVariablesExample {
  readonly lines = scrollbarDemoLines
}
