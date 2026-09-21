import { ChangeDetectionStrategy, Component, TemplateRef, viewChild } from '@angular/core'
import { Card } from '@fex-design/angular/ui/card'
@Component({
  selector: 'card-ui-extra-example',
  standalone: true,
  imports: [Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './extra.html',
})
export class ExtraExample {
  protected readonly extraTemplate = viewChild.required<TemplateRef<unknown>>('extra')
}
