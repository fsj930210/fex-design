import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressRange, ProgressTrack } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-multi-range-example',
  standalone: true,
  imports: [Progress, ProgressTrack, ProgressRange],
  templateUrl: './multi-range.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPrimitiveMultiRangeExample {}
