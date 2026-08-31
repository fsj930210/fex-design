import { Badge, BadgeGroup } from '@fex-design/angular/ui/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'badge-group-example',
  standalone: true,
  imports: [Badge, BadgeGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './group.html',
})
export class Group {}
