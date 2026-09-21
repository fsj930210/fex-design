import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputNumber } from '@fex-design/angular/ui/input-number'
@Component({
  selector: 'input-number-ui-constraints-example',
  standalone: true,
  imports: [InputNumber],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './constraints.html',
})
export class ConstraintsExample {}
