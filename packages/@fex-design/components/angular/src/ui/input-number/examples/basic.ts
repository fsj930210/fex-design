import { ChangeDetectionStrategy, Component, input, booleanAttribute } from '@angular/core'
import { InputNumber } from '@fex-design/angular/ui/input-number'
@Component({
  selector: 'input-number-ui-basic-example',
  standalone: true,
  imports: [InputNumber],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class BasicExample {
  readonly invalid = input(false, { transform: booleanAttribute })
}
