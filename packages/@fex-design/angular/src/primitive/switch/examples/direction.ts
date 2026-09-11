import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({ selector: 'switch-direction-example', standalone: true, imports: [SwitchRoot, SwitchContent, SwitchThumb], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html' })
export class SwitchDirectionExample {
  
}
