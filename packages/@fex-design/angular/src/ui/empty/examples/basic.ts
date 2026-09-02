import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Empty } from '@fex-design/angular/ui/empty'
@Component({ selector: 'empty-ui-basic-example', standalone: true, imports: [Empty], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class BasicExample {}
