import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressLabel, ProgressRange, ProgressTrack, ProgressValue } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-basic-example',
  standalone: true,
  imports: [Progress, ProgressLabel, ProgressRange, ProgressTrack, ProgressValue],
  templateUrl: './basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPrimitiveBasicExample {}
