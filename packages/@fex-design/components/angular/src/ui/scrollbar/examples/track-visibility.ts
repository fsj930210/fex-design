import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Scrollbar } from '@fex-design/angular/ui/scrollbar'

@Component({
  selector: 'scrollbar-track-visibility-example',
  standalone: true,
  imports: [Scrollbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './track-visibility.html',
})
export class ScrollbarTrackVisibilityExample {
  readonly lines = scrollbarDemoLines
}
