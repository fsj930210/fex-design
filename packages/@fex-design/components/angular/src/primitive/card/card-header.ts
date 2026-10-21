import { cardHeaderClassName } from '@fex-design/components-styles/card'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[cardHeader]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'card-header' },
  template: '<ng-content />',
})
export class CardHeader {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(cardHeaderClassName, () => this.class())
}
