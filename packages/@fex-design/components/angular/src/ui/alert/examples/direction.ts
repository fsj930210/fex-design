import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertActionContent } from '@fex-design/angular/ui/alert'
@Component({
  selector: 'alert-direction-ui-example',
  standalone: true,
  imports: [Alert, AlertActionContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class AlertDirectionExample {}
