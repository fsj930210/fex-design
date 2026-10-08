import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-dynamic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressCircle, ProgressCircleTrack, ProgressCircleRange],
  templateUrl: './dynamic.html',
})
export class ProgressPrimitiveDynamicExample {
  readonly value = signal(30)
  decrease() { this.value.update(current => Math.max(0, current - 10)) }
  increase() { this.value.update(current => Math.min(100, current + 10)) }
}
