import { ChangeDetectionStrategy, Component, TemplateRef, viewChild } from '@angular/core'
import { Card, CardDescription, CardExtra, CardHeader, CardTitle } from '@fex-design/angular/ui/card'

@Component({
  selector: 'card-ui-custom-header-example',
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardDescription, CardExtra],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-header.html',
})
export class CustomHeaderExample {
  protected readonly headerTemplate = viewChild.required<TemplateRef<unknown>>('customHeader')
}
