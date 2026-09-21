import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  InputNumberActions,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/angular/primitive/input-number'
@Component({
  selector: 'input-number-primitive-basic-example',
  standalone: true,
  imports: [
    InputNumberRoot,
    InputNumberControl,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class BasicExample {}
