import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SwitchRoot, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({
  selector: 'switch-size-example',
  standalone: true,
  imports: [SwitchRoot, SwitchThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './size.html',
})
export class SwitchSizeExample {}
