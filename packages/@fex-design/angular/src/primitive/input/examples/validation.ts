import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputControl, InputRoot } from '@fex-design/angular/primitive/input'

@Component({
  selector: 'input-primitive-validation-example',
  standalone: true,
  imports: [InputRoot, InputControl],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './validation.html',
})
export class ValidationExample {}
