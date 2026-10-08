import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressTrack, ProgressRange } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-multi-range-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress, ProgressTrack, ProgressRange],
  templateUrl: './multi-range.html',
})
export class ProgressPrimitiveMultiRangeExample {

}
