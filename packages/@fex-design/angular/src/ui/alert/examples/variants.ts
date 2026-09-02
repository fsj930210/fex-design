import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert } from '../alert'
@Component({ selector: 'alert-variants-example', standalone: true, imports: [Alert], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './variants.html' })
export class AlertVariantsExample {}
