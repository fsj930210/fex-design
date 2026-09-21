import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputControl, InputRoot } from '@fex-design/angular/primitive/input'
@Component({
  selector: 'input-primitive-states-example',
  standalone: true,
  imports: [InputRoot, InputControl],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './states.html',
})
export class StatesExample {}
