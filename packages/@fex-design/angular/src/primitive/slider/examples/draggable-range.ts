import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/angular/primitive/slider'
@Component({
  selector: 'slider-draggable-range-example',
  standalone: true,
  imports: [SliderRange, SliderRoot, SliderThumb, SliderTrack],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './draggable-range.html',
})
export class SliderDraggableRangeExample {
  protected log(value: unknown) {
    console.info(value)
  }
}
