import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/angular/primitive/slider'
@Component({
  selector: 'slider-marks-example',
  standalone: true,
  imports: [SliderMark, SliderRange, SliderRoot, SliderThumb, SliderTrack],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './marks.html',
})
export class SliderMarksExample {
  protected readonly recommended = signal(37)
  protected readonly marks = computed(() => [0, 26, this.recommended(), 100])
  protected readonly dots = Array.from({ length: 11 }, (_, index) => index * 10)
  protected moveRecommended() {
    this.recommended.update((value) => (value === 37 ? 60 : 37))
  }
  protected log(value: unknown) {
    console.info(value)
  }
}
