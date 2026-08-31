import { Badge } from '@fex-design/angular/ui/badge'
import { SwitchRoot, SwitchThumb } from '@fex-design/angular/primitive/switch'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
@Component({
  selector: 'badge-ui-zero-example',
  standalone: true,
  imports: [Badge, SwitchRoot, SwitchThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zero.html',
})
export class Zero {
  readonly showZero = signal(false)
}
