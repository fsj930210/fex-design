import { ChangeDetectionStrategy, Component, TemplateRef, viewChild } from '@angular/core'
import { Card } from '@fex-design/angular/ui/card'

@Component({
  selector: 'card-ui-styling-example',
  standalone: true,
  imports: [Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './styling.html',
})
export class StylingExample {
  protected readonly extraTemplate = viewChild.required<TemplateRef<unknown>>('extra')
  protected readonly footerTemplate = viewChild.required<TemplateRef<unknown>>('footer')
}
