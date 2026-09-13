import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Checkbox } from '@fex-design/angular/ui/checkbox'

@Component({ selector: 'checkbox-ui-css-variables-example', standalone: true, imports: [Checkbox], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './css-variables.html' })
export class CheckboxUiCssVariablesExample {}
