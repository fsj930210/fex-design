import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Spinner, SpinnerContainer, SpinnerOverlay, SpinnerText } from '@fex-design/angular/primitive/spinner'

@Component({ selector: 'spinner-primitive-overlay-example', standalone: true, imports: [Spinner, SpinnerContainer, SpinnerOverlay, SpinnerText], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './overlay.html' })
export class OverlayExample {
  protected readonly spinning = signal(true)
  protected toggleSpinning() { this.spinning.update((value) => !value) }
}
