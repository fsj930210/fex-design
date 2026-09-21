import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertAction, AlertIcon, AlertTitle } from '../alert'
import { alertCloseClassName } from '@fex-design/components-styles/alert'
import { TriangleAlertIcon } from '@fex-design/angular/icons/triangle-alert'
@Component({
  selector: 'alert-direction-example',
  standalone: true,
  imports: [Alert, AlertIcon, AlertTitle, AlertAction, TriangleAlertIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class AlertDirectionExample {
  protected readonly alertCloseClassName = alertCloseClassName
}
