import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Badge } from '@fex-design/angular/primitive/badge'
import { badgeRootClassName } from '@fex-design/components-styles/badge'
import { cn } from '@fex-design/utils'
@Component({
  selector: 'badge-semantic-styles-example',
  standalone: true,
  imports: [Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class BadgeSemanticStylesExample {
  readonly rootClass = cn(badgeRootClassName, 'rounded-xl bg-violet-50 p-3')
}
