import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/angular/primitive/slider'
import { Checkbox } from '@fex-design/angular/ui/checkbox'
@Component({
  selector: 'slider-disabled-example',
  standalone: true,
  imports: [SliderRange, SliderRoot, SliderThumb, SliderTrack, Checkbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disabled.html',
})
export class SliderDisabledExample {
  protected readonly disabledThumbs = signal([true, true, true])
  protected toggle(index: number) {
    this.disabledThumbs.update((current) =>
      current.map((value, item) => (item === index ? !value : value)),
    )
  }
  protected log(value: unknown) {
    console.info(value)
  }
}

