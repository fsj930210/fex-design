import type { ButtonGroupOrientation } from '@fex-design/core/button/types'
import { buttonGroupClassName } from '@fex-design/styles/button'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'

@Component({
  selector: 'div[buttonGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.data-orientation]': 'orientation()',
    '[style.gap]': 'gap()',
    role: 'group',
    'data-slot': 'button-group',
  },
  templateUrl: './button-group.html',
})
export class ButtonGroup {
  readonly orientation = input<ButtonGroupOrientation>('horizontal')
  readonly spacing = input<number | string>(0)

  protected readonly gap = () =>
    typeof this.spacing() === 'number' ? `${this.spacing()}px` : this.spacing()

  protected readonly hostClassName = createHostClassName(() =>
    buttonGroupClassName({ orientation: this.orientation(), connected: this.spacing() === 0 }),
  )
}
