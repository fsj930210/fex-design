import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SwitchRoot, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({ selector: 'switch-disabled-example', standalone: true, imports: [SwitchRoot, SwitchThumb], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './disabled.html' })
export class SwitchDisabledExample {
  
}
