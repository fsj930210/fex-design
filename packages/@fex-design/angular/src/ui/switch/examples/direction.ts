import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Switch } from '@fex-design/angular/ui/switch'
@Component({
  selector: 'switch-direction-example',
  standalone: true,
  imports: [Switch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class SwitchDirectionExample {}
