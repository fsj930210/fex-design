import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Switch } from '@fex-design/angular/ui/switch'
@Component({ selector: 'switch-shape-example', standalone: true, imports: [Switch], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './shape.html' })
export class SwitchShapeExample {
  
}
