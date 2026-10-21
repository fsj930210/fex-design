import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Alert, AlertIcon, AlertTitle, AlertAction } from '@fex-design/angular/primitive/alert'
import { InfoIcon } from '@fex-design/angular/icons/info'
import { XIcon } from '@fex-design/angular/icons/x'
import { alertCloseClassName, alertContentClassName } from '@fex-design/components-styles/alert'
@Component({
  selector: 'alert-semantic-styles-example',
  imports: [Alert, AlertIcon, AlertTitle, AlertAction, InfoIcon, XIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class AlertSemanticStylesExample {
  readonly purpleVisible = signal(true)
  readonly pinkVisible = signal(true)
  readonly alertCloseClassName = alertCloseClassName
  readonly alertContentClassName = alertContentClassName
}
