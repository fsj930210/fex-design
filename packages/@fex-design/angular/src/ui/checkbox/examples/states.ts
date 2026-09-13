import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Checkbox } from '@fex-design/angular/ui/checkbox'

@Component({ selector: 'checkbox-ui-states-example', standalone: true, imports: [Checkbox], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './states.html' })
export class CheckboxUiStatesExample {}
