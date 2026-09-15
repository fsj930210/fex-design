import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { Slider } from '@fex-design/angular/ui/slider'
@Component({
  selector: 'slider-marks-example',
  standalone: true,
  imports: [Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './marks.html',
})
export class SliderMarksExample {
  protected readonly recommended = signal(37)
  protected readonly marks = computed(() => [
    { value: 0, label: '0°C' },
    { value: 26, label: '26°C' },
    { value: this.recommended(), label: `建议 ${this.recommended()}°C` },
    { value: 100, label: '100°C' },
  ])
  protected moveRecommended() {
    this.recommended.update((value) => (value === 37 ? 60 : 37))
  }
  protected readonly weightClasses = { track: 'bg-orange-500', range: 'bg-blue-500' }
  protected readonly semanticClasses = {
    root: 'rounded-lg bg-muted p-6',
    track: 'bg-amber-200',
    range: 'bg-violet-600',
    thumb: 'border-violet-600',
    mark: 'text-violet-700',
  }
  protected readonly semanticStyles = { thumb: 'box-shadow:0 0 0 4px rgb(124 58 237 / 20%)' }
  protected log(value: unknown) {
    console.info(value)
  }
}
