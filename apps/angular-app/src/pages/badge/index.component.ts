import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Badge, BadgeGroup } from '@fex-design/angular/primitive/badge'
import Card from '@fex-design/angular/ui/card'

@Component({
  selector: 'fex-badge-page',
  imports: [RouterLink, Card, Badge, BadgeGroup],
  host: { class: 'block' },
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  protected readonly colors = ['primary', 'info', 'success', 'warning', 'danger'] as const
  protected readonly overflowItems = ['Design', 'Frontend', 'Backend', 'QA', 'Operations']
}
