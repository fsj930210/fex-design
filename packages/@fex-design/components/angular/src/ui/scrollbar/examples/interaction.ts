import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Scrollbar } from '@fex-design/angular/ui/scrollbar'

@Component({
  selector: 'scrollbar-interaction-example',
  standalone: true,
  imports: [Scrollbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './interaction.html',
})
export class ScrollbarInteractionExample {
  readonly lines = scrollbarDemoLines
}
