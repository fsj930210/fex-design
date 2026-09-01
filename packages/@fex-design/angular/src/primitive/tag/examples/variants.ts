import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag } from '@fex-design/angular/primitive/tag'
@Component({ selector: 'tag-variants-example', standalone: true, imports: [Tag], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './variants.html' })
export class Variants {}
