import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Slider } from '@fex-design/angular/ui/slider'
@Component({
  selector: 'slider-editable-example',
  standalone: true,
  imports: [Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editable.html',
})
export class SliderEditableExample {
  protected readonly values = signal([20, 50, 80])
  protected changeValues(next: number | number[]) {
    if (Array.isArray(next)) this.values.set(next)
  }
}
