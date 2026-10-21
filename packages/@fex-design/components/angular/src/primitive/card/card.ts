import { cardClassName } from '@fex-design/components-styles/card'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[card]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'card' },
  template: '<ng-content />',
})
export class Card {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(cardClassName, () => this.class())
}
