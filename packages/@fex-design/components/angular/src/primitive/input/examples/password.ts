import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { inputActionClassName } from '@fex-design/components-styles/input'
import { EyeIcon } from '@fex-design/angular/icons/eye'
import { EyeOffIcon } from '@fex-design/angular/icons/eye-off'
import {
  InputClear,
  InputControl,
  InputRoot,
  InputSuffix,
} from '@fex-design/angular/primitive/input'
@Component({
  selector: 'input-primitive-password-example',
  standalone: true,
  imports: [InputRoot, InputControl, InputSuffix, InputClear, EyeIcon, EyeOffIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './password.html',
})
export class PasswordExample {
  readonly firstVisible = signal(false)
  readonly invalidVisible = signal(false)
  readonly actionClassName = inputActionClassName
}
