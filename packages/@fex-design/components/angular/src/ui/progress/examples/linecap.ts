import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress } from '@fex-design/angular/ui/progress'

@Component({
  selector: 'progress-linecap-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  templateUrl: './linecap.html',
})
export class ProgressLinecapExample {

}
