import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputControl, InputRoot } from '@fex-design/angular/primitive/input'
@Component({
  selector: 'input-primitive-variants-example',
  standalone: true,
  imports: [InputRoot, InputControl],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './variants.html',
})
export class VariantsExample {}
