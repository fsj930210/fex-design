import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress, ProgressRange, ProgressTrack, ProgressValue } from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-custom-style-example',
  standalone: true,
  imports: [Progress, ProgressTrack, ProgressRange, ProgressValue],
  templateUrl: './custom-style.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPrimitiveCustomStyleExample {}
