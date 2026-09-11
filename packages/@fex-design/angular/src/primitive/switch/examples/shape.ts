import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SwitchRoot, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({ selector: 'switch-shape-example', standalone: true, imports: [SwitchRoot, SwitchThumb], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './shape.html' })
export class SwitchShapeExample {
  
}
