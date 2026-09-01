import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag } from '@fex-design/angular/ui/tag'
@Component({ selector: 'tag-ui-basic-example', standalone: true, imports: [Tag], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class Basic {}
