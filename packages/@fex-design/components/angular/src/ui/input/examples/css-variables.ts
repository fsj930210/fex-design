import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputSearch } from '@fex-design/angular/ui/input'
@Component({
  selector: 'input-css-variables-example',
  standalone: true,
  imports: [InputSearch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class InputCssVariablesExample {}
