import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert } from '../alert'
@Component({ selector: 'alert-closable-example', standalone: true, imports: [Alert], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './closable.html' })
export class AlertClosableExample { protected keepOpen(event: MouseEvent) { event.preventDefault() } }
