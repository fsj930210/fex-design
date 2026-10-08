import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-linecap-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressTrack, ProgressRange, ProgressValue],
  templateUrl: './linecap.html',
})
export class ProgressPrimitiveLinecapExample {

}
