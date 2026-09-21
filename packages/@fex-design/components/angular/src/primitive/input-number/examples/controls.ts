import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  InputNumberActions,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/angular/primitive/input-number'
@Component({
  selector: 'input-number-primitive-controls-example',
  standalone: true,
  imports: [
    InputNumberRoot,
    InputNumberControl,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controls.html',
})
export class ControlsExample {}
