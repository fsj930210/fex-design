import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'

@Component({
  selector: 'button-loading-indicator-example',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading-indicator.html',
})
export class LoadingIndicatorExample {}
