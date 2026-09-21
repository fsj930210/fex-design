import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Slider } from '@fex-design/angular/ui/slider'
@Component({
  selector: 'slider-basic-ui-example',
  standalone: true,
  imports: [Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class SliderBasicExample {
  protected readonly value = signal(42)
  protected readonly ended = signal(42)
  protected changeValue(next: number | number[]) {
    if (typeof next === 'number') this.value.set(next)
  }
  protected endValue(next: number | number[]) {
    if (typeof next === 'number') this.ended.set(next)
  }
  protected readonly marks = [
    { value: 0, label: '0°C' },
    { value: 37, label: '37°C' },
    { value: 100, label: '100°C' },
  ]
  protected readonly weightClasses = { track: 'bg-orange-500', range: 'bg-blue-500' }
  protected readonly semanticClasses = {
    root: 'rounded-lg bg-muted p-6',
    track: 'bg-amber-200',
    range: 'bg-violet-600',
    thumb: 'border-violet-600',
    mark: 'text-violet-700',
  }
  protected readonly semanticStyles = { thumb: 'box-shadow:0 0 0 4px rgb(124 58 237 / 20%)' }
}
