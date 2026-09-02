import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Empty } from '@fex-design/angular/ui/empty'
@Component({ selector: 'empty-ui-content-example', standalone: true, imports: [Empty], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './content.html' })
export class ContentExample {}
