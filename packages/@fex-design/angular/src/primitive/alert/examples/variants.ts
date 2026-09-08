import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertIcon, AlertTitle } from '../alert'
import { InfoIcon } from '../../../icon/info'
@Component({ selector: 'alert-variants-example', standalone: true, imports: [Alert, AlertIcon, AlertTitle, InfoIcon], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './variants.html' })
export class AlertVariantsExample {}
