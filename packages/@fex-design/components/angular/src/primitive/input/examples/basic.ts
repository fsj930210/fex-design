import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputClear, InputControl, InputRoot } from '@fex-design/angular/primitive/input'
@Component({
  selector: 'input-primitive-basic-example',
  standalone: true,
  imports: [InputRoot, InputControl, InputClear],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class BasicExample {}
