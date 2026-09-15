import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Switch } from '@fex-design/angular/ui/switch'
@Component({
  selector: 'switch-loading-example',
  standalone: true,
  imports: [Switch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading.html',
})
export class SwitchLoadingExample {}
