import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({ selector: 'switch-css-variables-example', standalone: true, imports: [SwitchRoot, SwitchContent, SwitchThumb], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './css-variables.html' })
export class SwitchCssVariablesExample {
  
}
