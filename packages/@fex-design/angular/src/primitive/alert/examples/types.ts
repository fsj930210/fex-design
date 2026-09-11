import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertTitle } from '../alert'
import { AlertIcon } from '../alert'
import { CircleCheckIcon } from '../../../icon/circle-check'
import { CircleXIcon } from '../../../icon/circle-x'
import { InfoIcon } from '../../../icon/info'
import { TriangleAlertIcon } from '../../../icon/triangle-alert'
@Component({
  selector: 'alert-types-example',
  standalone: true,
  imports: [
    Alert,
    AlertIcon,
    AlertTitle,
    CircleCheckIcon,
    InfoIcon,
    TriangleAlertIcon,
    CircleXIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './types.html',
})
export class AlertTypesExample {}
