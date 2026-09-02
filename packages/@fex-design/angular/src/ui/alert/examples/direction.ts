import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertActionContent } from '../alert'
@Component({ selector: 'alert-direction-example', standalone: true, imports: [Alert, AlertActionContent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html' })
export class AlertDirectionExample {}
