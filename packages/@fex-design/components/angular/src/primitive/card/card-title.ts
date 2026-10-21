import { cardTitleClassName } from '@fex-design/components-styles/card'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[cardTitle]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'card-title' },
  template: '<ng-content />',
})
export class CardTitle {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(cardTitleClassName, () => this.class())
}
