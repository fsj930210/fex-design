import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-gradient-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressCircle, ProgressCircleTrack, ProgressCircleRange],
  templateUrl: './gradient.html',
})
export class ProgressPrimitiveGradientExample {

}
