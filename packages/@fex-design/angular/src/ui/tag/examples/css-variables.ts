import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag } from '@fex-design/angular/ui/tag'
@Component({ selector: 'tag-ui-css-variables-example', standalone: true, imports: [Tag], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './css-variables.html' })
export class CssVariables {}
