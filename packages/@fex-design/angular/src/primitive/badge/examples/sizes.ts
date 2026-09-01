import type { BadgeSize } from '@fex-design/core'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Badge, BadgeDot } from '@fex-design/angular/primitive/badge'

@Component({
  selector: 'badge-primitive-sizes-example',
  standalone: true,
  imports: [Badge, BadgeDot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sizes.html',
})
export class Sizes {
  readonly sizes: readonly BadgeSize[] = ['sm', 'md', 'lg']
}
