import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertAction, AlertIcon, AlertTitle } from '../alert'
import { alertCloseClassName } from '@fex-design/styles/alert'
import { CircleWarningIcon } from '../../../icon/circle-warning'
@Component({ selector: 'alert-direction-example', standalone: true, imports: [Alert, AlertIcon, AlertTitle, AlertAction, CircleWarningIcon], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html' })
export class AlertDirectionExample { protected readonly alertCloseClassName = alertCloseClassName }
