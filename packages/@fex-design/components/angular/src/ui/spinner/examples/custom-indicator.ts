import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SpinnerContainer } from '@fex-design/angular/ui/spinner'

@Component({
  selector: 'spinner-custom-indicator-example',
  standalone: true,
  imports: [SpinnerContainer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-indicator.html',
})
export class CustomIndicatorExample {}
