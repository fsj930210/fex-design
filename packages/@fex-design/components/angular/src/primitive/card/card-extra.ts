import { cardExtraClassName } from '@fex-design/components-styles/card'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[cardExtra]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'card-extra' },
  template: '<ng-content />',
})
export class CardExtra {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(cardExtraClassName, () => this.class())
}
