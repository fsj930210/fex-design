import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Checkbox } from '@fex-design/angular/ui/checkbox'

@Component({ selector: 'checkbox-ui-direction-example', standalone: true, imports: [Checkbox], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html' })
export class CheckboxUiDirectionExample {}
