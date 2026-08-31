import { type BadgeClassNames, type BadgeStyles } from '@fex-design/core'
import { Badge } from '@fex-design/angular/ui/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'
@Component({
  selector: 'badge-ui-styling-example',
  standalone: true,
  imports: [Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './styling.html',
})
export class Styling {
  readonly classNames: BadgeClassNames = {
    root: 'rounded-xl bg-violet-50 p-3',
    content: 'rounded-lg bg-violet-100 text-violet-950',
    indicator: 'font-bold',
  }
  readonly styles: BadgeStyles<string> = {
    root: 'outline:2px dashed #7c3aed;',
    content: 'padding:16px 20px;',
    indicator: 'background:#7c3aed;',
  }
}
