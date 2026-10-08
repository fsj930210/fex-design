import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Progress } from '@fex-design/angular/ui/progress'

@Component({
  selector: 'progress-dynamic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  templateUrl: './dynamic.html',
})
export class ProgressDynamicExample {
  readonly value = signal(30)
  decrease() { this.value.update(current => Math.max(0, current - 10)) }
  increase() { this.value.update(current => Math.min(100, current + 10)) }
}
