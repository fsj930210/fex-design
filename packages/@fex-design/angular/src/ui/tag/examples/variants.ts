import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag } from '@fex-design/angular/ui/tag'
@Component({ selector: 'tag-ui-variants-example', standalone: true, imports: [Tag], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './variants.html' })
export class Variants {}
