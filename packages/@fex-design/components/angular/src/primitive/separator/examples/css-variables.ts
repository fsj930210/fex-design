import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '@fex-design/angular/primitive/separator'
@Component({
  selector: 'separator-css-variables-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class SeparatorCssVariablesExample {}
