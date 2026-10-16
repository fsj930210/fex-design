import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert } from '@fex-design/angular/ui/alert'
@Component({
  selector: 'alert-basic-ui-example',
  standalone: true,
  imports: [Alert],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class AlertBasicExample {}
