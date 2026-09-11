import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Switch } from '@fex-design/angular/ui/switch'
@Component({ selector: 'switch-basic-example', standalone: true, imports: [Switch], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class SwitchBasicExample {
  
}
