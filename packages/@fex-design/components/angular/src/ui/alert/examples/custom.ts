import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertActionContent, AlertIconContent } from '@fex-design/angular/ui/alert'
@Component({
  selector: 'alert-custom-ui-example',
  standalone: true,
  imports: [Alert, AlertIconContent, AlertActionContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom.html',
})
export class AlertCustomExample {}
