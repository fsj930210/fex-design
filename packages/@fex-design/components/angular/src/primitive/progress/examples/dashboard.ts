import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressCircle, ProgressCircleTrack, ProgressCircleRange, ProgressValue } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-dashboard-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressCircle, ProgressCircleTrack, ProgressCircleRange, ProgressValue],
  templateUrl: './dashboard.html',
})
export class ProgressPrimitiveDashboardExample {

}
