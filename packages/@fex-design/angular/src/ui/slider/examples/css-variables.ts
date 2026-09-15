import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Slider } from '@fex-design/angular/ui/slider'
@Component({
  selector: 'slider-css-variables-example',
  standalone: true,
  imports: [Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class SliderCssVariablesExample {
}
