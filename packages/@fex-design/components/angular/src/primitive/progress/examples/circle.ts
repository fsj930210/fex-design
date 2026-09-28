import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressValue,
} from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-circle-example',
  standalone: true,
  imports: [
    Progress,
    ProgressCircle,
    ProgressCircleTrack,
    ProgressCircleRange,
    ProgressValue,
  ],
  templateUrl: './circle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPrimitiveCircleExample {}
