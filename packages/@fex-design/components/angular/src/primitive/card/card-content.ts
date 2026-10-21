import { cardContentClassName } from '@fex-design/components-styles/card'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[cardContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'card-content' },
  template: '<ng-content />',
})
export class CardContent {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(cardContentClassName, () => this.class())
}
