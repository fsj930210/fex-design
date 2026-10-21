import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert } from '@fex-design/angular/ui/alert'
@Component({
  selector: 'alert-css-variables-example',
  standalone: true,
  imports: [Alert],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class AlertCssVariablesExample {}
