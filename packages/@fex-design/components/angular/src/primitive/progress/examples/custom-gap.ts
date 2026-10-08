import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Slider } from '@fex-design/angular/ui/slider'
import { StepRingDemo } from './_parts/step-ring'

@Component({
  selector: 'progress-primitive-custom-gap-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Slider, StepRingDemo],
  templateUrl: './custom-gap.html',
})
export class ProgressPrimitiveCustomGapExample {
  readonly gap = signal(2)
  changeGap(next: number | number[]) { this.gap.set(typeof next === 'number' ? next : next[0] ?? 2) }
}
