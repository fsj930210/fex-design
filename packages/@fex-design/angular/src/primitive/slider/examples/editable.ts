import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/angular/primitive/slider'
@Component({
  selector: 'slider-editable-example',
  standalone: true,
  imports: [SliderRange, SliderRoot, SliderThumb, SliderTrack],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editable.html',
})
export class SliderEditableExample {
  protected readonly values = signal([20, 50, 80])
}
