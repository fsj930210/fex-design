import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/angular/primitive/progress'
import { CheckIcon } from '@fex-design/angular/icons/check'

@Component({
  selector: 'div[progressStepLineDemo]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  imports: [Progress, ProgressTrack, ProgressRange, ProgressValue, CheckIcon],
  templateUrl: './step-line.html',
})
export class StepLineDemo {
  readonly value = input.required<number>()
  readonly active = input.required<number>()
  readonly indices = [0, 1, 2, 3, 4]
}
