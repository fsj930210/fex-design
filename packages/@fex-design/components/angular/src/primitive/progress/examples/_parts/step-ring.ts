import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core'
import { Progress, ProgressCircle, ProgressValue } from '@fex-design/angular/primitive/progress'
import { CheckIcon } from '@fex-design/angular/icons/check'
import { getCircleStepsGeometry } from '@fex-design/core/progress/progress'

@Component({
  selector: 'div[progressStepRingDemo]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  imports: [Progress, ProgressCircle, CheckIcon, ProgressValue],
  templateUrl: './step-ring.html',
})
export class StepRingDemo {
  readonly value = input.required<number>()
  readonly gap = input(2)
  readonly steps = input(10)
  readonly color = input<string>()
  readonly geometry = computed(() => getCircleStepsGeometry({ value: this.value(), gap: this.gap(), steps: this.steps(), size: 96, thickness: 4 }))
  readonly ringColor = computed(() => this.color() ?? (this.value() === 100 ? 'var(--success)' : 'var(--info)'))
}
