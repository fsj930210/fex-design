import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
@Component({
  selector: 'svg[shrinkIcon]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    width: '24',
    height: '24',
    'aria-hidden': 'true',
  },
  templateUrl: './shrink.html',
})
export class ShrinkIcon {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName('shrink-0 size-6', () => this.class())
}
