import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertIcon, AlertTitle } from '../alert'
import { CircleInfoIcon } from '../../../icon/circle-info'
@Component({ selector: 'alert-variants-example', standalone: true, imports: [Alert, AlertIcon, AlertTitle, CircleInfoIcon], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './variants.html' })
export class AlertVariantsExample {}
