import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Scrollbar } from '@fex-design/angular/ui/scrollbar'

@Component({
  selector: 'scrollbar-semantic-styles-example',
  standalone: true,
  imports: [Scrollbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class ScrollbarSemanticStylesExample {
  readonly lines = scrollbarDemoLines
}
