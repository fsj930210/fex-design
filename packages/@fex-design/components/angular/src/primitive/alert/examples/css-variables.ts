import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertDescription, AlertTitle } from '@fex-design/angular/primitive/alert'
@Component({
  selector: 'alert-css-variables-example',
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class AlertCssVariablesExample {}
