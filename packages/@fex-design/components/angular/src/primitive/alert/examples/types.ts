import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertTitle } from '../alert'
import { AlertIcon } from '../alert'
import { CircleCheckIcon } from '@fex-design/angular/icons/circle-check'
import { CircleXIcon } from '@fex-design/angular/icons/circle-x'
import { InfoIcon } from '@fex-design/angular/icons/info'
import { TriangleAlertIcon } from '@fex-design/angular/icons/triangle-alert'
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
