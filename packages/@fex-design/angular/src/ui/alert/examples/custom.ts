import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertActionContent, AlertIconContent } from '../alert'
@Component({ selector: 'alert-custom-example', standalone: true, imports: [Alert, AlertIconContent, AlertActionContent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './custom.html' })
export class AlertCustomExample {}
