import type { BadgeSize } from '@fex-design/core'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Badge } from '@fex-design/angular/ui/badge'

@Component({
  selector: 'badge-ui-sizes-example',
  standalone: true,
  imports: [Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sizes.html',
})
export class Sizes {
  readonly sizes: readonly BadgeSize[] = ['sm', 'md', 'lg']
}
