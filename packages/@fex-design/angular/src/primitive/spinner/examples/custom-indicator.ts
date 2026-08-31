import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Spinner } from '@fex-design/angular/primitive/spinner'

@Component({
  selector: 'spinner-primitive-custom-indicator-example',
  standalone: true,
  imports: [Spinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-indicator.html',
})
export class CustomIndicatorExample {}
