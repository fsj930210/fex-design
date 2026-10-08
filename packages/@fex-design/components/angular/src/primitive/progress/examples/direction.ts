import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-direction-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange, ProgressCircle, ProgressCircleTrack, ProgressCircleRange],
  templateUrl: './direction.html',
})
export class ProgressPrimitiveDirectionExample {

}
