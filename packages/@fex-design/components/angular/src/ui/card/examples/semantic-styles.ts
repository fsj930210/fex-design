import { ChangeDetectionStrategy, Component, TemplateRef, viewChild } from '@angular/core'
import { Card } from '@fex-design/angular/ui/card'

@Component({
  selector: 'card-semantic-styles-example',
  standalone: true,
  imports: [Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class CardSemanticStylesExample {
  protected readonly extraTemplate = viewChild.required<TemplateRef<unknown>>('extra')
  protected readonly footerTemplate = viewChild.required<TemplateRef<unknown>>('footer')
}
