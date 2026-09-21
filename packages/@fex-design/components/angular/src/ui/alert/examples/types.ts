import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert } from '../alert'
@Component({
  selector: 'alert-types-ui-example',
  standalone: true,
  imports: [Alert],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './types.html',
})
export class AlertTypesExample {}
