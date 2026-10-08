import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Progress } from '@fex-design/angular/ui/progress'
import { Slider } from '@fex-design/angular/ui/slider'

@Component({
  selector: 'progress-custom-gap-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Slider, Progress],
  templateUrl: './custom-gap.html',
})
export class ProgressCustomGapExample {
  readonly gap = signal(2)
  changeGap(next: number | number[]) { this.gap.set(typeof next === 'number' ? next : next[0] ?? 2) }
}
