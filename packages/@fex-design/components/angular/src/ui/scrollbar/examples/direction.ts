import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Scrollbar } from '@fex-design/angular/ui/scrollbar'

@Component({
  selector: 'scrollbar-direction-example',
  standalone: true,
  imports: [Scrollbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class ScrollbarDirectionExample {
  readonly lines = scrollbarDemoLines
}
