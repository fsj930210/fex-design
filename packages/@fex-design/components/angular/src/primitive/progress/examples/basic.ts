import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange],
  templateUrl: './basic.html',
})
export class ProgressPrimitiveBasicExample {

}
