import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Slider } from '@fex-design/angular/ui/slider'
@Component({
  selector: 'slider-semantic-styles-example',
  standalone: true,
  imports: [Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SliderSemanticStylesExample {
  protected readonly marks = [
    { value: 25, label: '低' },
    { value: 75, label: '高' },
  ]
  protected readonly semanticClasses = {
    root: 'rounded-lg bg-muted p-6',
    track: 'bg-amber-200',
    range: 'bg-violet-600',
    thumb: 'border-violet-600',
    mark: 'text-violet-700',
  }
  protected readonly semanticStyles = { thumb: 'box-shadow:0 0 0 4px rgb(124 58 237 / 20%)' }
}
