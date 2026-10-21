import { cardDescriptionClassName } from '@fex-design/components-styles/card'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[cardDescription]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'card-description' },
  template: '<ng-content />',
})
export class CardDescription {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(cardDescriptionClassName, () =>
    this.class(),
  )
}
