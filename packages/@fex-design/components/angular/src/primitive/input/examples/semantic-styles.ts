import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  InputRoot,
  InputPrefix,
  InputControl,
  InputClear,
  InputSuffix,
  InputGroup,
  InputAddonAfter,
} from '@fex-design/angular/primitive/input'
import { Button } from '@fex-design/angular/primitive/button'
import {
  inputActionClassName,
  inputSearchAddonClassName,
} from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
import { EyeIcon } from '@fex-design/angular/icons/eye'
import { EyeOffIcon } from '@fex-design/angular/icons/eye-off'
import { SearchIcon } from '@fex-design/angular/icons/search'
@Component({
  selector: 'input-semantic-styles-example',
  standalone: true,
  imports: [
    InputRoot,
    InputPrefix,
    InputControl,
    InputClear,
    InputSuffix,
    InputGroup,
    InputAddonAfter,
    Button,
    EyeIcon,
    EyeOffIcon,
    SearchIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class InputSemanticStylesExample {
  readonly value = signal('structured')
  readonly visible = signal(false)
  readonly actionClass = cn(inputActionClassName, 'text-violet-500')
  readonly searchClass = inputSearchAddonClassName
}
