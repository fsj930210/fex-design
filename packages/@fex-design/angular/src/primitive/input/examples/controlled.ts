import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Button } from '@fex-design/angular/primitive/button'
import { InputClear, InputControl, InputRoot } from '@fex-design/angular/primitive/input'
@Component({
  selector: 'input-primitive-controlled-example',
  standalone: true,
  imports: [InputRoot, InputControl, InputClear, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class ControlledExample {
  readonly value = signal('受控内容')
}
