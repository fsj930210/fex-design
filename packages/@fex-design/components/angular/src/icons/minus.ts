import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'minus-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'aria-hidden': 'true',
  },
  templateUrl: './minus.html',
})
export class MinusIcon {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(
    'inline-flex items-center justify-center shrink-0 size-6',
    () => this.class(),
  )
}
