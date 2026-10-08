import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress } from '@fex-design/angular/ui/progress'

@Component({
  selector: 'progress-multi-range-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  templateUrl: './multi-range.html',
})
export class ProgressMultiRangeExample {
  readonly ranges = [{ value: 30, color: 'var(--primary)' }, { value: 25, color: 'var(--success)' }, { value: 15, color: 'var(--warning)' }]
  readonly format = () => '已分配 70%'
}
