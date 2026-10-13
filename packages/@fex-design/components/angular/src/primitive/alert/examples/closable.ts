import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../alert'
import { alertCloseClassName } from '@fex-design/components-styles/alert'
import { TriangleAlertIcon } from '@fex-design/angular/icons/triangle-alert'
import { XIcon } from '@fex-design/angular/icons/x'
@Component({
  selector: 'alert-closable-example',
  standalone: true,
  imports: [Alert, AlertIcon, AlertTitle, AlertDescription, TriangleAlertIcon, XIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './closable.html',
})
export class AlertClosableExample {
  protected readonly visible = signal(true)
  protected readonly alertCloseClassName = alertCloseClassName
}
