import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SwitchRoot, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({ selector: 'switch-validation-example', standalone: true, imports: [SwitchRoot, SwitchThumb], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './validation.html' })
export class SwitchValidationExample {
  
}
