import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressRange,
  ProgressCircle,
  ProgressCircleTrack,
  ProgressCircleRange,
} from '@fex-design/angular/primitive/progress'
@Component({
  selector: 'progress-semantic-styles-example',
  standalone: true,
  imports: [
    Progress,
    ProgressLabel,
    ProgressTrack,
    ProgressRange,
    ProgressCircle,
    ProgressCircleTrack,
    ProgressCircleRange,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class ProgressSemanticStylesExample {}
