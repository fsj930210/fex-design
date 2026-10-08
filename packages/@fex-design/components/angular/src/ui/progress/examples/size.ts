import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress } from '@fex-design/angular/ui/progress'

@Component({
  selector: 'progress-size-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  templateUrl: './size.html',
})
export class ProgressSizeExample {

}
