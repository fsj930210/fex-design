import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  Spinner,
  SpinnerContainer,
  SpinnerOverlay,
  SpinnerText,
} from '@fex-design/angular/primitive/spinner'

@Component({
  selector: 'spinner-css-variables-example',
  standalone: true,
  imports: [Spinner, SpinnerContainer, SpinnerOverlay, SpinnerText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class SpinnerCssVariablesExample {
  protected readonly spinning = signal(true)
  protected toggleSpinning() {
    this.spinning.update((value) => !value)
  }
}
