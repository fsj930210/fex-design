import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel } from '@fex-design/angular/primitive/checkbox'

@Component({ selector: 'checkbox-primitive-css-variables-example', standalone: true, imports: [CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './css-variables.html' })
export class CheckboxPrimitiveCssVariablesExample {}
