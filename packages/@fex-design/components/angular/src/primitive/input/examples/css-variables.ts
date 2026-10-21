import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  InputGroup,
  InputRoot,
  InputControl,
  InputAddonBefore,
  InputAddonAfter,
} from '@fex-design/angular/primitive/input'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'input-css-variables-example',
  standalone: true,
  imports: [InputGroup, InputRoot, InputControl, InputAddonBefore, InputAddonAfter, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class InputCssVariablesExample {}
