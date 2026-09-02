import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Empty } from '@fex-design/angular/ui/empty'
@Component({ selector: 'empty-ui-styling-example', standalone: true, imports: [Empty], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './styling.html' })
export class StylingExample {}
