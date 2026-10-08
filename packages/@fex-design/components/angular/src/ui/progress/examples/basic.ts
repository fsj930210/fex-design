import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress } from '@fex-design/angular/ui/progress'

@Component({
  selector: 'progress-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  templateUrl: './basic.html',
})
export class ProgressBasicExample {

}
