import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/angular/primitive/slider'
@Component({
  selector: 'slider-basic-example',
  standalone: true,
  imports: [SliderRange, SliderRoot, SliderThumb, SliderTrack],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class SliderBasicExample {
  protected readonly value = signal([42])
  protected readonly ended = signal([42])
}
