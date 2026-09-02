import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertTitle } from '../alert'
import { AlertIcon } from '../alert'
import { CircleCheckIcon } from '../../../icon/circle-check'
import { CircleErrorIcon } from '../../../icon/circle-error'
import { CircleInfoIcon } from '../../../icon/circle-info'
import { CircleWarningIcon } from '../../../icon/circle-warning'
@Component({ selector: 'alert-types-example', standalone: true, imports: [Alert, AlertIcon, AlertTitle, CircleCheckIcon, CircleInfoIcon, CircleWarningIcon, CircleErrorIcon], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './types.html' })
export class AlertTypesExample {}
