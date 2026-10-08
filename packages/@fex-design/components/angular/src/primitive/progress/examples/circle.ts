import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressCircle, ProgressCircleTrack, ProgressCircleRange, ProgressValue } from '@fex-design/angular/primitive/progress'
import { CheckIcon } from '@fex-design/angular/icons/check'

@Component({
  selector: 'progress-primitive-circle-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressCircle, ProgressCircleTrack, ProgressCircleRange, ProgressValue, CheckIcon],
  templateUrl: './circle.html',
})
export class ProgressPrimitiveCircleExample {

}
