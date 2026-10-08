import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/angular/primitive/progress'
import { CheckIcon } from '@fex-design/angular/icons/check'

@Component({
  selector: 'progress-primitive-status-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressTrack, ProgressRange, ProgressValue, CheckIcon],
  templateUrl: './status.html',
})
export class ProgressPrimitiveStatusExample {

}
