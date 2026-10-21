import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SpinnerContainer } from '@fex-design/angular/ui/spinner'

@Component({
  selector: 'spinner-css-variables-example',
  standalone: true,
  imports: [SpinnerContainer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class SpinnerCssVariablesExample {
  protected readonly spinning = signal(true)
  protected toggleSpinning() {
    this.spinning.update((value) => !value)
  }
}
