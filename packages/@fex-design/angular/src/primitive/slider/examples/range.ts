import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/angular/primitive/slider'
@Component({
  selector: 'slider-range-example',
  standalone: true,
  imports: [SliderRange, SliderRoot, SliderThumb, SliderTrack],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './range.html',
})
export class SliderRangeExample {
  protected log(value: unknown) {
    console.info(value)
  }
}
