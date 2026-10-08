import { ChangeDetectionStrategy, Component } from '@angular/core'
import { StepLineDemo } from './_parts/step-line'
import { StepRingDemo } from './_parts/step-ring'

@Component({
  selector: 'progress-primitive-segmented-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StepLineDemo, StepRingDemo],
  templateUrl: './segmented.html',
})
export class ProgressPrimitiveSegmentedExample {

}
