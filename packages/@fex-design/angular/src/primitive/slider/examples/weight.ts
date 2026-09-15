import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/angular/primitive/slider'
@Component({
  selector: 'slider-weight-example',
  standalone: true,
  imports: [SliderRange, SliderRoot, SliderThumb, SliderTrack],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weight.html',
})
export class SliderWeightExample {
  protected readonly value = signal([40])
  protected readonly left = computed(() => this.value()[0]!)
  protected readonly right = computed(() => 100 - this.left())
}
