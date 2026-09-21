import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputControl, InputRoot } from '@fex-design/angular/primitive/input'
@Component({
  selector: 'input-primitive-sizes-example',
  standalone: true,
  imports: [InputRoot, InputControl],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sizes.html',
})
export class SizesExample {}
