import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag } from '@fex-design/angular/primitive/tag'
@Component({ selector: 'tag-css-variables-example', standalone: true, imports: [Tag], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './css-variables.html' })
export class CssVariables {}
