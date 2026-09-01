import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag, TagClose } from '@fex-design/angular/primitive/tag'
@Component({ selector: 'tag-basic-example', standalone: true, imports: [Tag, TagClose], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class Basic {}
