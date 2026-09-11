import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SwitchRoot, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({ selector: 'switch-basic-example', standalone: true, imports: [SwitchRoot, SwitchThumb], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class SwitchBasicExample {
  
}
