import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-format-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange],
  templateUrl: './format.html',
})
export class ProgressPrimitiveFormatExample {

}
