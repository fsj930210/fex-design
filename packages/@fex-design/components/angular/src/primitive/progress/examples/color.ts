import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-color-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressCircle, ProgressCircleTrack, ProgressCircleRange],
  templateUrl: './color.html',
})
export class ProgressPrimitiveColorExample {

}
