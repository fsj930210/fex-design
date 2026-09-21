import { ChangeDetectionStrategy, Component, TemplateRef, viewChild } from '@angular/core'
import { Card } from '@fex-design/angular/ui/card'
@Component({
  selector: 'card-ui-css-variables-example',
  standalone: true,
  imports: [Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class CssVariablesExample {
  protected readonly footerTemplate = viewChild.required<TemplateRef<unknown>>('footer')
}
