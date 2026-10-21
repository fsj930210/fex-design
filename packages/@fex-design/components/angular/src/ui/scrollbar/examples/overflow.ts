import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Scrollbar, ScrollbarViewport } from '@fex-design/angular/ui/scrollbar'

@Component({
  selector: 'scrollbar-overflow-example',
  standalone: true,
  imports: [Scrollbar, ScrollbarViewport],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './overflow.html',
})
export class ScrollbarOverflowExample {
  readonly lines = scrollbarDemoLines
}
