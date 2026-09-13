import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Checkbox } from '@fex-design/angular/ui/checkbox'
@Component({ selector: 'checkbox-ui-semantic-styles-example', standalone: true, imports: [Checkbox], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './semantic-styles.html' })
export class CheckboxUiSemanticStylesExample {}
