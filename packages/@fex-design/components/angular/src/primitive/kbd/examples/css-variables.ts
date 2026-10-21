import { Component } from '@angular/core'
import { Kbd, KbdGroup } from '@fex-design/angular/primitive/kbd'
@Component({
  selector: 'kbd-css-variables-example',
  standalone: true,
  imports: [Kbd, KbdGroup],
  templateUrl: './css-variables.html',
})
export class KbdCssVariablesExample {}
