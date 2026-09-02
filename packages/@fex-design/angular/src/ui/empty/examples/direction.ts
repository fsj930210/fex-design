import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Empty } from '@fex-design/angular/ui/empty'

@Component({ selector: 'empty-ui-direction-example', standalone: true, imports: [Empty], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html' })
export class DirectionExample {}
