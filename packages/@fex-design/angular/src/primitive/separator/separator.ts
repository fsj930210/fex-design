import { separatorClassName } from '@fex-design/styles/separator'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import type { SeparatorOrientation } from '@fex-design/core/separator/types'
import { createHostClassName } from '../../signals/host-class'
@Component({
  selector: 'div[separator]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    'data-slot': 'separator',
    '[attr.data-orientation]': 'orientation()',
  },
  template: '',
})
export class Separator {
  readonly orientation = input<SeparatorOrientation>('horizontal')
  protected readonly hostClassName = createHostClassName(() => separatorClassName)
}
