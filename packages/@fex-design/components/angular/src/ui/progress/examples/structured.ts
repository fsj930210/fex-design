import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress } from '@fex-design/angular/ui/progress'

@Component({
  selector: 'progress-structured-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  templateUrl: './structured.html',
})
export class ProgressStructuredExample {

}
