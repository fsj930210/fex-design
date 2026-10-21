import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button, ButtonIcon } from '@fex-design/angular/primitive/button'
import { LoadingIcon } from '@fex-design/angular/icons/loading'
@Component({
  selector: 'button-css-variables-example',
  standalone: true,
  imports: [Button, ButtonIcon, LoadingIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class ButtonCssVariablesExample {}
