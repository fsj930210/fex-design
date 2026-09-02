import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert } from '../alert'
@Component({ selector: 'alert-basic-example', standalone: true, imports: [Alert], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class AlertBasicExample {}
