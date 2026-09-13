import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel, CheckboxGroup } from '@fex-design/angular/primitive/checkbox'

@Component({ selector: 'checkbox-primitive-group-example', standalone: true, imports: [CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel, CheckboxGroup], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './group.html' })
export class CheckboxPrimitiveGroupExample {}
