import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Scrollbar, ScrollbarViewport } from '@fex-design/angular/ui/scrollbar'
@Component({
  selector: 'scrollbar-basic-example', standalone: true,
  imports: [Scrollbar, ScrollbarViewport],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class ScrollbarBasicExample {
  readonly lines = scrollbarDemoLines
}
