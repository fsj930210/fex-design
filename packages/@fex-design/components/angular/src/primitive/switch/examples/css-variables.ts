import { Spinner } from '@fex-design/angular/primitive/spinner'
import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({
  selector: 'switch-css-variables-example',
  standalone: true,
  imports: [Spinner, SwitchRoot, SwitchContent, SwitchThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class SwitchCssVariablesExample {}
