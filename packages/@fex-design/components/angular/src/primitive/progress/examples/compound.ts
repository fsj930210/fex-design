import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/angular/primitive/progress'

@Component({
  selector: 'progress-primitive-compound-example',
  standalone: true,
  imports: [
    Progress,
    ProgressLabel,
    ProgressTrack,
    ProgressRange,
    ProgressValue,
  ],
  templateUrl: './compound.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPrimitiveCompoundExample {}
