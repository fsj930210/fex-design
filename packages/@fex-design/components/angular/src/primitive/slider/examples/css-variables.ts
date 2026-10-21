import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from '@fex-design/angular/primitive/slider'
@Component({
  selector: 'slider-css-variables-example',
  imports: [SliderRoot, SliderTrack, SliderRange, SliderThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class SliderCssVariablesExample {}
