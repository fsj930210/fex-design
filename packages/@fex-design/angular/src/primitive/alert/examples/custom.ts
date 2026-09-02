import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Alert, AlertAction, AlertIcon, AlertTitle } from '../alert'
import { alertCloseClassName } from '@fex-design/styles/alert'
@Component({ selector: 'alert-custom-example', standalone: true, imports: [Alert, AlertIcon, AlertTitle, AlertAction], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './custom.html' })
export class AlertCustomExample { protected readonly visible = signal(true); protected readonly alertCloseClassName = alertCloseClassName }
