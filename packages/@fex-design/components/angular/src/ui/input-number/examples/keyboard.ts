import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputNumber } from '@fex-design/angular/ui/input-number'
@Component({
  selector: 'input-number-ui-keyboard-example',
  standalone: true,
  imports: [InputNumber],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './keyboard.html',
})
export class KeyboardExample {}
