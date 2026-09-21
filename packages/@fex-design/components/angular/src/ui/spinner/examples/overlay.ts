import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SpinnerContainer } from '@fex-design/angular/ui/spinner'

@Component({
  selector: 'spinner-overlay-example',
  standalone: true,
  imports: [SpinnerContainer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './overlay.html',
})
export class OverlayExample {
  protected readonly spinning = signal(true)
  protected toggleSpinning() {
    this.spinning.update((value) => !value)
  }
}
