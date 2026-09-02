import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../alert'
import { alertCloseClassName } from '@fex-design/styles/alert'
import { CircleWarningIcon } from '../../../icon/circle-warning'
@Component({ selector: 'alert-closable-example', standalone: true, imports: [Alert, AlertIcon, AlertTitle, AlertDescription, CircleWarningIcon], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './closable.html' })
export class AlertClosableExample { protected readonly visible = signal(true); protected readonly alertCloseClassName = alertCloseClassName }
