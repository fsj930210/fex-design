import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress } from '@fex-design/angular/ui/progress'

@Component({
  selector: 'progress-format-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  templateUrl: './format.html',
})
export class ProgressFormatExample {
  readonly formatStorage = (percent: number | null) => (percent ?? 0) + ' / 100 GB'
}
