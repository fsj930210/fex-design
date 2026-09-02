import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag, TagAction } from '@fex-design/angular/primitive/tag'
@Component({ selector: 'tag-basic-example', standalone: true, imports: [Tag, TagAction], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class Basic {}
