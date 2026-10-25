import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'svg[clockIcon]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    width: '24',
    height: '24',
    'aria-hidden': 'true',
  },
  templateUrl: './clock.html',
})
export class ClockIcon {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName('shrink-0 size-6', () => this.class())
}
