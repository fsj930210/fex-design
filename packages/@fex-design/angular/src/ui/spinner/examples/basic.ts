import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Spinner } from '@fex-design/angular/ui/spinner'

@Component({ selector: 'spinner-basic-example', standalone: true, imports: [Spinner], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class BasicExample {}
