import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertDescription, AlertTitle } from '@fex-design/angular/primitive/alert'
@Component({
  selector: 'alert-basic-example',
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class AlertBasicExample {}
