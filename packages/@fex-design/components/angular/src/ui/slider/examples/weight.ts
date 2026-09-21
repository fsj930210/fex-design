import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { Slider } from '@fex-design/angular/ui/slider'
@Component({
  selector: 'slider-weight-ui-example',
  standalone: true,
  imports: [Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weight.html',
})
export class SliderWeightExample {
  protected readonly value = signal(40)
  protected readonly right = computed(() => 100 - this.value())
  protected readonly weightClasses = { track: 'bg-orange-500', range: 'bg-blue-500' }
  protected changeValue(next: number | number[]) {
    if (typeof next === 'number') this.value.set(next)
  }
}
