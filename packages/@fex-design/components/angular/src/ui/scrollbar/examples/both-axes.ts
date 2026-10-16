import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Scrollbar } from '@fex-design/angular/ui/scrollbar'

@Component({
  selector: 'scrollbar-both-axes-example', standalone: true,
  imports: [Scrollbar], changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './both-axes.html',
})
export class ScrollbarBothAxesExample {
  readonly lines = scrollbarDemoLines
}
