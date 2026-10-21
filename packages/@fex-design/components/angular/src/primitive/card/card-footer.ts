import { cardFooterClassName } from '@fex-design/components-styles/card'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[cardFooter]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'card-footer' },
  template: '<ng-content />',
})
export class CardFooter {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(cardFooterClassName, () => this.class())
}
