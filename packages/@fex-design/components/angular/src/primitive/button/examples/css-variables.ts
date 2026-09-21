import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'button-primitive-css-variables-example',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class CssVariablesExample {}
